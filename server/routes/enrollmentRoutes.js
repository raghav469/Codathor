const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');
const { protect } = require('../middlewares/auth');

router.post('/', protect, enrollmentController.createEnrollment);
router.get('/', protect, enrollmentController.getUserEnrollments);
router.post('/payment', protect, enrollmentController.createPaymentOrder);
router.post('/verify', protect, enrollmentController.verifyPayment);

module.exports = router;