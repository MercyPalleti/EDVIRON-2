const WebhookLog = require('../models/WebhookLog');
const Order = require('../models/Order');
const OrderStatus = require('../models/OrderStatus');


// POST /webhook
exports.receive = async (req, res) => {
const payload = req.body;
await WebhookLog.create({ payload });


// example payload.order_info.order_id might be custom_order_id or collect_id
const orderInfo = payload.order_info || {};
const customOrderId = orderInfo.order_id;


// find corresponding order by custom_order_id
const order = await Order.findOne({ custom_order_id: customOrderId });
if (!order) {
// try to match on collect id if payload contains collect_id
return res.status(404).json({ message: 'Order not found for webhook' });
}


// update or create order status
const update = {
order_amount: orderInfo.order_amount,
transaction_amount: orderInfo.transaction_amount,
payment_mode: orderInfo.payment_mode,
payment_details: orderInfo.payemnt_details || orderInfo.payment_details,
bank_reference: orderInfo.bank_reference,
payment_message: orderInfo.Payment_message || orderInfo.payment_message,
status: orderInfo.status,
error_message: orderInfo.error_message,
payment_time: orderInfo.payment_time ? new Date(orderInfo.payment_time) : undefined,
gateway: orderInfo.gateway
};


const orderStatus = await OrderStatus.findOneAndUpdate({ collect_id: order._id }, update, { new: true, upsert: true });


res.json({ message: 'Webhook processed', orderStatus });
};