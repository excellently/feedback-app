import axios from 'axios';

export default {
  getMessages() {
    return axios.get('/messages/all');
  },

  getChildMessages(parentId) {
    return axios.get(`/child-messages/${parentId}`);
  },

  createMessage(data) {
    return axios.post('/message', data);
  },

  createChildMessage(data) {
    return axios.post('/child-message', data);
  }
};
