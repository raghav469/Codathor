const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  competition: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Competition',
    required: true 
  },
  enrolledAt: { 
    type: Date, 
    default: Date.now 
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentId: String,
  paymentDetails: Object,
  status: {
    type: String,
    enum: ['active', 'completed', 'withdrawn'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Prevent duplicate enrollments
enrollmentSchema.index({ user: 1, competition: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);