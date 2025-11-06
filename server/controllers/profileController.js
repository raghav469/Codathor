const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc    Get user profile
// @route   GET /api/profile/:id
// @access  Public
exports.getProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
        .select('-password')
        .populate('achievements.competition', 'title image');
    
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    
    res.json(user);
});

// @desc    Update user profile
// @route   PUT /api/profile
// @access  Private
exports.updateProfile = asyncHandler(async (req, res) => {
    const { name, bio, skills, social } = req.body;
    
    const user = await User.findById(req.user.id);
    
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    
    user.name = name || user.name;
    user.bio = bio || user.bio;
    user.skills = skills || user.skills;
    user.social = social || user.social;
    
    if (req.file) {
        user.avatar = req.file.path;
    }
    
    const updatedUser = await user.save();
    res.json(updatedUser);
});

// @desc    Get user achievements
// @route   GET /api/profile/:id/achievements
// @access  Public
exports.getAchievements = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
        .select('achievements')
        .populate('achievements.competition', 'title image');
    
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    
    res.json(user.achievements);
});