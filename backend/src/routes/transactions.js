const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactionsController');
const auth = require('../middleware/auth');


router.get('/transactions', auth, transactionsController.getAll);
router.get('/transactions/school/:schoolId', auth, transactionsController.getBySchool);
router.get('/transaction-status/:custom_order_id', auth, transactionsController.checkStatus);


module.exports = router;