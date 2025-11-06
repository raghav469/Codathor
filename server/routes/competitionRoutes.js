const express = require('express');
const router = express.Router();
const competitionController = require('../controllers/competitionController');
const { protect, admin } = require('../middlewares/auth');

router.get('/', competitionController.getCompetitions);
router.get('/:id', competitionController.getCompetition);
router.post('/', protect, admin, competitionController.createCompetition);
router.put('/:id', protect, admin, competitionController.updateCompetition);
router.delete('/:id', protect, admin, competitionController.deleteCompetition);

module.exports = router;