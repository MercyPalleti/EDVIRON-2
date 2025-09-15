const mongoose = require('mongoose');


const studentInfoSchema = new mongoose.Schema({
name: String,
id: String,
email: String
}, { _id: false });

const orderSchema = new mongoose.Schema({
  school_id: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
  trustee_id: { type: mongoose.Schema.Types.ObjectId },
  student_info: studentInfoSchema,
  gateway_name: { type: String },
  custom_order_id: { type: String, required: true, unique: true, index: true }
}, { timestamps: true }); // ✅ adds createdAt & updatedAt automatically


module.exports = mongoose.model('Order', orderSchema);