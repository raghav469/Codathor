const Submission = require('../models/Submission');
const asyncHandler = require('express-async-handler');

// @desc    Create submission
// @route   POST /api/submissions
// @access  Private
exports.createSubmission = asyncHandler(async (req, res) => {
    const { competitionId, title, description, repositoryUrl, demoUrl } = req.body;
    
    // Check if user is enrolled
    const enrollment = await Enrollment.findOne({
        user: req.user.id,
        competition: competitionId
    });
    
    if (!enrollment) {
        res.status(403);
        throw new Error('You must enroll in the competition first');
    }
    
    const submission = new Submission({
        user: req.user.id,
        competition: competitionId,
        title,
        description,
        repositoryUrl,
        demoUrl,
        files: req.files ? req.files.map(file => file.path) : []
    });
    
    const createdSubmission = await submission.save();
    res.status(201).json(createdSubmission);
});

// @desc    Get submissions for competition
// @route   GET /api/submissions/competition/:id
// @access  Public
exports.getCompetitionSubmissions = asyncHandler(async (req, res) => {
    const submissions = await Submission.find({ competition: req.params.id })
        .populate('user', 'name email')
        .sort('-submittedAt');
    res.json(submissions);
});

// @desc    Score submission
// @route   POST /api/submissions/:id/score
// @access  Private (Admin/Judge)
exports.scoreSubmission = asyncHandler(async (req, res) => {
    const { criteria, score, comments } = req.body;
    
    const submission = await Submission.findById(req.params.id);
    if (!submission) {
        res.status(404);
        throw new Error('Submission not found');
    }
    
    // Check if already scored by this judge
    const existingScore = submission.scores.find(s => s.judge.toString() === req.user.id);
    if (existingScore) {
        res.status(400);
        throw new Error('You have already scored this submission');
    }
    
    submission.scores.push({
        judge: req.user.id,
        criteria,
        score,
        comments
    });
    
    // Calculate average score
    submission.averageScore = submission.scores.reduce((sum, s) => sum + s.score, 0) / submission.scores.length;
    
    await submission.save();
    res.json(submission);
});