import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import api from '../api';

const MessagesActions = {
  loadMessages() {
    AppDispatcher.dispatch({
      type: Constants.LOAD_MESSAGES_REQUEST
    });

    api.getMessages()
      .then(({ data }) =>
        AppDispatcher.dispatch({
          type: Constants.LOAD_MESSAGES_SUCCESS,
          messages: data
        })
      )
      .catch(err =>
        AppDispatcher.dispatch({
          type: Constants.LOAD_MESSAGES_FAIL,
          error: err
        })
      );
  },

  createMessage(message) {
    api.createMessage(message)
      .then(() => {
        this.loadMessages();
        AppDispatcher.dispatch({
          type: Constants.CREATE_MESSAGE_SUCCESS
        });
      }
      )
      .catch(err =>
        console.error(err)
      );
  },

  saveMessageValues(message) {
    AppDispatcher.dispatch({
      type: Constants.SAVE_MESSAGE_VALUES,
      message
    });
  },

  resetIsAdded() {
    AppDispatcher.dispatch({
      type: Constants.RESET_IS_ADDED
    });
  },

  decrementPage() {
    AppDispatcher.dispatch({
      type: Constants.DECREMENT_PAGE
    });
  },

  incrementPage() {
    AppDispatcher.dispatch({
      type: Constants.INCREMENT_PAGE
    });
  },

  setCurrentPage(currentPage) {
    AppDispatcher.dispatch({
      type: Constants.SET_CURRENT_PAGE,
      currentPage
    });
  }
};

export default MessagesActions;
