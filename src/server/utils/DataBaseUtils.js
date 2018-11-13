const mongoose = require('mongoose');

import { MONGO_URL } from '../../etc/config';
import '../models/Message';

const Message = mongoose.model('Message');

function setUpConnection() {
  mongoose.connect(
    MONGO_URL,
    {
      keepAlive: true,
      reconnectTries: Number.MAX_VALUE,
      useMongoClient: true
    }
  );
}

function createMessage(data) {
  const message = new Message({
    subject: data.subject,
    text: data.text
  });

  return message.save();
}

function getMessages() {
  return Message.find().sort({ createdAt:-1 });
}

module.exports = {
  setUpConnection,
  createMessage,
  getMessages
};
