const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const attemptSchema = new mongoose.Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    quizId: {
      type: Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true
    },
    score: {
      type: Number,
      required: true
    },
    answers: [
      {
        questionId: {
          type: Schema.Types.ObjectId,
          ref: 'Question',
          required: true
        },
        selectedOption: {
          type: Schema.Types.ObjectId,
          ref: 'Question.options'
        }
      }
    ],
    startedAt: {
      type: Date,
      default: null
    },
    completedAt: {
      type: Date,
      default: Date.now
    },
    timeTaken: {
      type: Number,
      default: null
    }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Attempt', attemptSchema);
  