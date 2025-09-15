const mongoose = require('mongoose');


const webhookLogSchema = new mongoose.Schema({
payload: Object,
receivedAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('WebhookLog', webhookLogSchema);