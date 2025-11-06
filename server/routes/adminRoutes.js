const express = require('express');
const router = express.Router();
const { admin } = require('../middlewares/auth');
const upload = require('../utils/fileUpload');
const {
  createCompetition,
  updateCompetition,
  deleteCompetition,
  getAllSubmissions,
  updateSubmissionStatus
} = require('../controllers/adminController');

// Competition Management
router.post('/competitions', admin, upload.single('image'), createCompetition);
router.put('/competitions/:id', admin, upload.single('image'), updateCompetition);
router.delete('/competitions/:id', admin, deleteCompetition);

// Submission Management
router.get('/submissions', admin, getAllSubmissions);
router.put('/submissions/:id/status', admin, updateSubmissionStatus);

module.exports = router;