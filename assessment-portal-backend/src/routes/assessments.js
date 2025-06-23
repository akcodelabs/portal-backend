const express = require('express');
const {
    createAssessment,
    getAssessments,
    getAssessment
} = require('../controllers/assessmentController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
    .post(protect, authorize('teacher', 'admin'), createAssessment)
    .get(protect, getAssessments);

router.route('/:id')
    .get(protect, getAssessment);

module.exports = router;