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

function createChildMessage(data) {
  const message = new Message({
    text: data.text,
    parentId: data.parentId
  });

  return message.save();
}

function getMessages() {
  return Message.find({
    parentId: { $exists: false }
  }).sort({ createdAt:-1 });
}

function getChildMessages(parentId) {
  return Message.find({
    parentId
  });
}

module.exports = {
  setUpConnection,
  createMessage,
  createChildMessage,
  getMessages,
  getChildMessages
};
