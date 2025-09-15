const mongoose = require('mongoose');


const orderStatusSchema = new mongoose.Schema({
collect_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', index: true },
order_amount: Number,
transaction_amount: Number,
payment_mode: String,
payment_details: String,
bank_reference: String,
payment_message: String,
status: { type: String, index: true },
error_message: String,
payment_time: Date,
gateway: String
}, { timestamps: true });


module.exports = mongoose.model('OrderStatus', orderStatusSchema);