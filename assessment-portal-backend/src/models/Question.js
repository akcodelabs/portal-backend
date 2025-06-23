const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    assessmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assessment',
        required: true
    },
    type: {
        type: String,
        enum: ['multiple-choice', 'true-false', 'short-answer', 'essay', 'fill-blanks'],
        required: [true, 'Question type is required']
    },
    question: {
        type: String,
        required: [true, 'Question text is required']
    },
    options: [{
        text: String,
        isCorrect: Boolean
    }],
    correctAnswer: String, // For non-MCQ questions
    marks: {
        type: Number,
        required: [true, 'Marks is required'],
        min: 1
    },
    explanation: String,
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        default: 'medium'
    },
    tags: [String],
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Question', questionSchema);