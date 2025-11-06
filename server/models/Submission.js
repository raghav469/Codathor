const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    competition: { type: mongoose.Schema.Types.ObjectId, ref: 'Competition', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    repositoryUrl: { type: String },
    demoUrl: { type: String },
    files: [{ type: String }],
    submittedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['submitted', 'under_review', 'approved', 'rejected'], default: 'submitted' },
    scores: [{
        judge: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        criteria: { type: String },
        score: { type: Number },
        comments: { type: String }
    }],
    averageScore: { type: Number }
});

module.exports = mongoose.model('Submission', submissionSchema);