const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController');


// webhooks are usually public endpoints that the gateway calls
router.post('/webhook', express.json({ type: '*/*' }), webhookController.receive);


module.exports = router;