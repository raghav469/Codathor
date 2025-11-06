const mongoose = require('mongoose');

const competitionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    type: { type: String, enum: ['free', 'paid'], default: 'free' },
    price: { type: Number, default: 0 },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    prize: { type: String, required: true },
    tags: [{ type: String }],
    details: { type: String, required: true },
    requirements: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    participants: { type: Number, default: 0 },

category: { 
    type: String, 
    enum: ['coding', 'ai-ml', 'blockchain', 'web-dev', 'mobile-dev', 'game-dev', 'data-science', 'cybersecurity'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'intermediate'
  },
  maxTeamSize: {
    type: Number,
    default: 1
  },
  judgingCriteria: [{
    name: { type: String, required: true },
    weight: { type: Number, required: true }
  }],
  resources: [{
    title: { type: String, required: true },
    url: { type: String, required: true },
    type: { type: String, enum: ['documentation', 'tutorial', 'dataset', 'other'] }
  }]
});
module.exports = mongoose.model('Competition', competitionSchema);