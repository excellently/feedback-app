const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const MessageSchema = new Schema(
  {
    subject: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: false
  }
);

MessageSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Message', MessageSchema);
