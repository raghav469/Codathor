const Enrollment = require('../models/Enrollment');
const Competition = require('../models/Competition');
const asyncHandler = require('express-async-handler');
const Razorpay = require('razorpay');
const crypto = require('crypto');
// @desc    Create new enrollment
// @route   POST /api/enrollments
// @access  Private
exports.createEnrollment = asyncHandler(async (req, res) => {
    const { competitionId, paymentMethod, amount } = req.body;
    
    const competition = await Competition.findById(competitionId);
    if (!competition) {
        res.status(404);
        throw new Error('Competition not found');
    }
    
    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
        user: req.user.id,
        competition: competitionId
    });
    
    if (existingEnrollment) {
        res.status(400);
        throw new Error('Already enrolled in this competition');
    }
    
    // Create enrollment
    const enrollment = new Enrollment({
        user: req.user.id,
        competition: competitionId,
        status: competition.type === 'free' ? 'completed' : 'pending',
        paymentMethod,
        amount
    });
    
    await enrollment.save();
    
    // Update participants count if enrollment is completed
    if (enrollment.status === 'completed') {
        competition.participants += 1;
        await competition.save();
    }
    
    res.status(201).json(enrollment);
});

// @desc    Get user enrollments
// @route   GET /api/enrollments
// @access  Private
exports.getUserEnrollments = asyncHandler(async (req, res) => {
    const enrollments = await Enrollment.find({ user: req.user.id }).populate('competition');
    res.json(enrollments);
});
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// @desc    Create payment order
// @route   POST /api/enrollments/payment
// @access  Private
exports.createPaymentOrder = asyncHandler(async (req, res) => {
  const { competitionId, amount } = req.body;
  
  const competition = await Competition.findById(competitionId);
  if (!competition) {
    res.status(404);
    throw new Error('Competition not found');
  }

  const options = {
    amount: amount * 100, // amount in smallest currency unit (paise)
    currency: 'INR',
    receipt: `receipt_${competitionId}_${req.user.id}`,
    payment_capture: 1
  };

  try {
    const response = await razorpay.orders.create(options);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount
    });
  } catch (err) {
    console.error(err);
    res.status(500);
    throw new Error('Payment processing failed');
  }
});

// @desc    Verify payment
// @route   POST /api/enrollments/verify
// @access  Private
exports.verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature, competitionId } = req.body;
  
  const generated_signature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest('hex');

  if (generated_signature !== razorpay_signature) {
    res.status(400);
    throw new Error('Payment verification failed');
  }

  // Create enrollment
  const enrollment = new Enrollment({
    user: req.user.id,
    competition: competitionId,
    status: 'completed',
    paymentId: razorpay_payment_id,
    paymentMethod: 'razorpay'
  });

  await enrollment.save();

  // Update participants count
  await Competition.findByIdAndUpdate(competitionId, {
    $inc: { participants: 1 }
  });

  res.json({
    success: true,
    enrollment
  });
});