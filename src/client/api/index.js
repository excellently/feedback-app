import axios from 'axios';

// import { PORT } from '../../etc/config';

export default {
  getMessages() {
    return axios.get('/messages/all');
  },

  createMessage(data) {
    return axios.post('/message', data);
  }
};
