const Competition = require('../models/Competition');
const asyncHandler = require('express-async-handler');

// @desc    Get all competitions
// @route   GET /api/competitions
// @access  Public
exports.getCompetitions = asyncHandler(async (req, res) => {
    const { type } = req.query;
    let filter = {};
    
    if (type) {
        filter.type = type;
    }
    
    const competitions = await Competition.find(filter);
    res.json(competitions);
});

// @desc    Get single competition
// @route   GET /api/competitions/:id
// @access  Public
exports.getCompetition = asyncHandler(async (req, res) => {
    const competition = await Competition.findById(req.params.id);
    
    if (!competition) {
        res.status(404);
        throw new Error('Competition not found');
    }
    
    res.json(competition);
});

// @desc    Create a competition
// @route   POST /api/competitions
// @access  Private/Admin
exports.createCompetition = asyncHandler(async (req, res) => {
    const { title, description, image, type, price, startDate, endDate, prize, tags, details, requirements } = req.body;
    
    const competition = new Competition({
        title,
        description,
        image,
        type,
        price,
        startDate,
        endDate,
        prize,
        tags,
        details,
        requirements,
        participants: 0
    });
    
    const createdCompetition = await competition.save();
    res.status(201).json(createdCompetition);
});

// @desc    Update a competition
// @route   PUT /api/competitions/:id
// @access  Private/Admin
exports.updateCompetition = asyncHandler(async (req, res) => {
    const { title, description, image, type, price, startDate, endDate, prize, tags, details, requirements } = req.body;
    
    const competition = await Competition.findById(req.params.id);
    
    if (!competition) {
        res.status(404);
        throw new Error('Competition not found');
    }
    
    competition.title = title || competition.title;
    competition.description = description || competition.description;
    competition.image = image || competition.image;
    competition.type = type || competition.type;
    competition.price = price || competition.price;
    competition.startDate = startDate || competition.startDate;
    competition.endDate = endDate || competition.endDate;
    competition.prize = prize || competition.prize;
    competition.tags = tags || competition.tags;
    competition.details = details || competition.details;
    competition.requirements = requirements || competition.requirements;
    
    const updatedCompetition = await competition.save();
    res.json(updatedCompetition);
});

// @desc    Delete a competition
// @route   DELETE /api/competitions/:id
// @access  Private/Admin
exports.deleteCompetition = asyncHandler(async (req, res) => {
    const competition = await Competition.findById(req.params.id);
    
    if (!competition) {
        res.status(404);
        throw new Error('Competition not found');
    }
    
    await competition.remove();
    res.json({ message: 'Competition removed' });
});
// In competitionController.js
exports.getCompetitions = asyncHandler(async (req, res) => {
    const { type, category, difficulty, search } = req.query;
    let filter = {};
    
    if (type) filter.type = type;
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    
    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { tags: { $regex: search, $options: 'i' } }
        ];
    }
    
    const competitions = await Competition.find(filter)
        .sort('-createdAt');
    res.json(competitions);
});