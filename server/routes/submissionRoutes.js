const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');
const { protect } = require('../middlewares/auth');
const upload = require('../utils/fileUpload');

router.post('/', protect, upload.array('files'), submissionController.createSubmission);
router.get('/competition/:id', submissionController.getCompetitionSubmissions);
router.post('/:id/score', protect, submissionController.scoreSubmission);

module.exports = router;