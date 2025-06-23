const Assessment = require('../models/Assessment');
const Question = require('../models/Question');
const Submission = require('../models/Submission');

// Create assessment
exports.createAssessment = async (req, res) => {
    try {
        const assessmentData = {
            ...req.body,
            createdBy: req.user._id
        };

        const assessment = await Assessment.create(assessmentData);
        
        res.status(201).json({
            success: true,
            message: 'Assessment created successfully',
            assessment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create assessment',
            error: error.message
        });
    }
};

// Get all assessments
exports.getAssessments = async (req, res) => {
    try {
        const { page = 1, limit = 10, status, subject } = req.query;
        
        const query = {};
        
        // Add filters
        if (status) query.status = status;
        if (subject) query.subject = subject;
        
        // For students, only show published assessments they're invited to
        if (req.user.role === 'student') {
            query.status = 'published';
            query['participants.user'] = req.user._id;
        }

        const assessments = await Assessment.find(query)
            .populate('createdBy', 'name email')
            .populate('questions')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await Assessment.countDocuments(query);

        res.json({
            success: true,
            assessments,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to get assessments',
            error: error.message
        });
    }
};

// Get single assessment
exports.getAssessment = async (req, res) => {
    try {
        const assessment = await Assessment.findById(req.params.id)
            .populate('createdBy', 'name email')
            .populate('questions');

        if (!assessment) {
            return res.status(404).json({
                success: false,
                message: 'Assessment not found'
            });
        }

        res.json({
            success: true,
            assessment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to get assessment',
            error: error.message
        });
    }
};
