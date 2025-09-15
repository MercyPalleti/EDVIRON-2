const Order = require('../models/Order');
const OrderStatus = require('../models/OrderStatus');
const mongoose = require('mongoose');

// GET /transactions (with pagination, sorting, filters)

exports.getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sortField = req.query.sort || 'payment_time';
    const sortOrder = req.query.order === 'asc' ? 1 : -1;
    const statusFilter = req.query.status; // e.g. "Success" or "Failed"
    const schoolFilter = req.query.school_id;

    const match = {};

    // ✅ School filter
    if (schoolFilter) {
      match['school_id'] = new mongoose.Types.ObjectId(schoolFilter);
    }

    // ✅ Date filter
    const fromDate = req.query.from ? new Date(req.query.from) : null;
    const toDate = req.query.to ? new Date(req.query.to) : null;

    if (fromDate || toDate) {
      match['payment_time'] = {};
      if (fromDate) {
        match['payment_time'].$gte = fromDate;
      }
      if (toDate) {
        toDate.setHours(23, 59, 59, 999); // include full "to" day
        match['payment_time'].$lte = toDate;
      }
    }

    const pipeline = [
      {
        $lookup: {
          from: 'orderstatuses',
          localField: '_id',
          foreignField: 'collect_id',
          as: 'order_status'
        }
      },
      { $unwind: { path: '$order_status', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          collect_id: '$_id',
          school_id: '$school_id',
          gateway: '$order_status.gateway',
          order_amount: '$order_status.order_amount',
          transaction_amount: '$order_status.transaction_amount',
          status: '$order_status.status',   // projected as "status"
          custom_order_id: '$custom_order_id',
          payment_time: '$order_status.payment_time',
          createdAt: 1
        }
      },
      { $match: match }
    ];

    // ✅ Status filter must come AFTER projection
    if (statusFilter && statusFilter !== "All") {
      pipeline.push({
        $match: { status: { $in: statusFilter.split(',') } }
      });
    }

    pipeline.push({ $sort: { [sortField]: sortOrder } });
    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: limit });

    const data = await Order.aggregate(pipeline);

    res.json({ page, limit, data });
  } catch (error) {
    console.error("Error in getAll transactions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET /transactions/school/:schoolId
exports.getBySchool = async (req, res) => {
  const { schoolId } = req.params;
  const data = await Order.aggregate([
    { $match: { school_id: new mongoose.Types.ObjectId(schoolId) } },
    {
      $lookup: {
        from: 'orderstatuses',
        localField: '_id',
        foreignField: 'collect_id',
        as: 'order_status'
      }
    },
    { $unwind: { path: '$order_status', preserveNullAndEmptyArrays: true } },
    {
      $project: {
        collect_id: '$_id',
        school_id: '$school_id',
        gateway: '$order_status.gateway',
        order_amount: '$order_status.order_amount',
        transaction_amount: '$order_status.transaction_amount',
        status: '$order_status.status',
        custom_order_id: '$custom_order_id',
        payment_time: '$order_status.payment_time',
        createdAt: 1
      }
    }
  ]);
  res.json({ data });
};

// GET /transaction-status/:custom_order_id
exports.checkStatus = async (req, res) => {
  const { custom_order_id } = req.params;
  const order = await Order.findOne({ custom_order_id });
  if (!order) return res.status(404).json({ message: 'Order not found' });
  const status = await OrderStatus.findOne({ collect_id: order._id });
  res.json({ custom_order_id, status });
};
