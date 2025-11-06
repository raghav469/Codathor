const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    createdAt: { type: Date, default: Date.now },
    bio: { type: String },
    avatar: { type: String },
    skills: [{ type: String }],
    social: {
        github: { type: String },
        linkedin: { type: String },
        twitter: { type: String }
    },
    achievements: [{
        title: { type: String, required: true },
        description: { type: String },
        date: { type: Date, default: Date.now },
        competition: { type: mongoose.Schema.Types.ObjectId, ref: 'Competition' }
    }],
    stats: {
        competitionsEntered: { type: Number, default: 0 },
        competitionsWon: { type: Number, default: 0 },
        submissions: { type: Number, default: 0 }
    }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Generate JWT token
userSchema.methods.generateAuthToken = function() {
    return jwt.sign({ id: this._id, role: this.role }, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRE
    });
};

// Compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);