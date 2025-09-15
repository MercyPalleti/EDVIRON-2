const axios = require('axios');
const Joi = require('joi');
const crypto = require('crypto');
const Order = require('../models/Order');
const OrderStatus = require('../models/OrderStatus');

// Helper to generate unique ID
function generateOrderId() {
  return 'ORD-' + crypto.randomBytes(8).toString('hex');
}

// POST /create-payment (Cashfree Sandbox)
exports.createPayment = async (req, res) => {
  /* Expected body:
    {
      order_amount, student_info: {id, name, email, phone}, return_url
      (custom_order_id optional)
    }
  */
  const schema = Joi.object({
    order_amount: Joi.number().required(),
    return_url: Joi.string().uri().required(),
    student_info: Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required()
    }).required(),
    custom_order_id: Joi.string().optional()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });

  let { custom_order_id, student_info, order_amount, return_url } = req.body;

  // Auto-generate unique order ID if not provided
  if (!custom_order_id) {
    custom_order_id = generateOrderId();
  }

  // Prevent duplicate custom_order_id
  const exists = await Order.findOne({ custom_order_id });
  if (exists) return res.status(400).json({ message: 'custom_order_id already exists, use a new one' });

  // Create local order record
  const order = await Order.create({ custom_order_id, school_id: process.env.SCHOOL_ID, student_info });

  // Build payload for Cashfree
  const apiPayload = {
    order_id: custom_order_id,
    order_amount,
    order_currency: "INR",
    order_note: "School Fees Payment",
    customer_details: {
      customer_id: student_info.id,
      customer_name: student_info.name,
      customer_email: student_info.email,
      customer_phone: student_info.phone
    },
    order_meta: {
      return_url: `${return_url}?order_id={order_id}`
    }
  };

  try {
    const resp = await axios.post(
      'https://sandbox.cashfree.com/pg/orders',
      apiPayload,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-client-id': process.env.CASHFREE_APP_ID,
          'x-client-secret': process.env.CASHFREE_SECRET_KEY,
          'x-api-version': '2022-09-01'

        }
      }
    );

    const data = resp.data;

    // Store initial OrderStatus with pending state
    const orderStatus = await OrderStatus.create({
      collect_id: order._id,
      order_amount,
      status: 'pending',
      gateway: 'Cashfree'
    });

    res.json({
      message: 'Cashfree order created',
      order_token: data.order_token,
      payment_link: data.payment_link,
      order,
      orderStatus,
      raw: data
    });
  } catch (err) {
    console.error(err?.response?.data || err.message);
    res.status(500).json({
      message: 'Cashfree API error',
      error: err?.response?.data || err.message
    });
  }
};

// GET /check-payment-status/:order_id (Cashfree Sandbox)
exports.checkPaymentStatus = async (req, res) => {
  const { order_id } = req.params;

  try {
    const resp = await axios.get(
      `https://sandbox.cashfree.com/pg/orders/${order_id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-client-id': process.env.CASHFREE_APP_ID,
          'x-client-secret': process.env.CASHFREE_SECRET_KEY,
          'x-api-version': '2022-09-01'

        }
      }
    );

    res.json(resp.data);
  } catch (err) {
    console.error(err?.response?.data || err.message);
    res.status(500).json({
      message: 'Cashfree status API error',
      error: err?.response?.data || err.message
    });
  }
};