const WebhookLog = require('../models/WebhookLog');
const Order = require('../models/Order');
const OrderStatus = require('../models/OrderStatus');

// POST /api/webhook
exports.receive = async (req, res) => {
  try {
    const payload = req.body;

    // log incoming webhook
    await WebhookLog.create({
      payload,
      receivedAt: new Date()
    });

    const orderInfo = payload.order_info || {};
    const customOrderId = orderInfo.order_id;

    // try finding order
    let order = await Order.findOne({ custom_order_id: customOrderId });
    if (!order && orderInfo.collect_id) {
      order = await Order.findOne({ collect_id: orderInfo.collect_id });
    }

    if (!order) {
      return res.status(404).json({ message: 'Order not found for webhook' });
    }

    // prepare update data
    const update = {
      order_amount: orderInfo.order_amount,
      transaction_amount: orderInfo.transaction_amount,
      payment_mode: orderInfo.payment_mode,
      payment_details: orderInfo.payment_details,
      bank_reference: orderInfo.bank_reference,
      payment_message: orderInfo.payment_message,
      status: orderInfo.status,
      error_message: orderInfo.error_message,
      payment_time: orderInfo.payment_time ? new Date(orderInfo.payment_time) : undefined,
      gateway: orderInfo.gateway
    };

    // update or insert order status
    const orderStatus = await OrderStatus.findOneAndUpdate(
      { collect_id: orderInfo.collect_id || order._id.toString() }, // prefer collect_id if available
      update,
      { new: true, upsert: true }
    );

    res.json({ message: 'Webhook processed successfully', orderStatus });
  } catch (err) {
    console.error('❌ Webhook error:', err);
    await WebhookLog.create({
      payload: req.body,
      error: err.message,
      receivedAt: new Date()
    });
    res.status(500).json({ message: 'Webhook processing failed' });
  }
};
