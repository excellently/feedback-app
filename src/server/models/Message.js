const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const MessageSchema = new Schema(
  {
    subject: {
      type: String
    },
    text: {
      type: String,
      required: true
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: 'Message'
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
