const Enrollment = require('../models/Enrollment');
const Competition = require('../models/Competition');
const asyncHandler = require('express-async-handler');
const { sendEnrollmentEmail } = require('../services/emailService');

exports.createEnrollment = asyncHandler(async (req, res) => {
  const { competitionId, paymentMethod, paymentId } = req.body;
  
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
    paymentMethod,
    paymentId,
    paymentStatus: paymentId ? 'completed' : 'pending'
  });

  await enrollment.save();

  // Update competition participants count
  await Competition.findByIdAndUpdate(competitionId, {
    $inc: { participants: 1 }
  });

  // Send confirmation email
  await sendEnrollmentEmail(req.user, enrollment);

  res.status(201).json(enrollment);
});

exports.getUserEnrollments = asyncHandler(async (req, res) => {
  const enrollments = await Enrollment.find({ user: req.user.id })
    .populate('competition', 'title image startDate endDate prize');
  
  res.json(enrollments);
});

exports.getCompetitionEnrollments = asyncHandler(async (req, res) => {
  const enrollments = await Enrollment.find({ competition: req.params.competitionId })
    .populate('user', 'name email');
  
  res.json(enrollments);
});