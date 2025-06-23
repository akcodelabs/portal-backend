const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    assessmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assessment',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    answers: [{
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question',
            required: true
        },
        answer: mongoose.Schema.Types.Mixed, // Can be string, array, etc.
        isCorrect: Boolean,
        marksObtained: {
            type: Number,
            default: 0
        },
        timeTaken: Number // in seconds
    }],
    score: {
        totalMarks: Number,
        obtainedMarks: Number,
        percentage: Number
    },
    status: {
        type: String,
        enum: ['in-progress', 'submitted', 'graded', 'reviewed'],
        default: 'in-progress'
    },
    timeSpent: {
        type: Number, // in minutes
        default: 0
    },
    startedAt: {
        type: Date,
        default: Date.now
    },
    submittedAt: Date,
    attemptNumber: {
        type: Number,
        default: 1
    },
    feedback: String
}, {
    timestamps: true
});

// Compound index to ensure one submission per attempt
submissionSchema.index({ assessmentId: 1, userId: 1, attemptNumber: 1 }, { unique: true });

module.exports = mongoose.model('Submission', submissionSchema);