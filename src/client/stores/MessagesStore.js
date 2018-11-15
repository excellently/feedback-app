import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let _messages = [];
let _text = '';
let _subject = '';
let _loadingError = null;
let _isLoading = false;
let _isAdded = false;
let _currentPage = 1;
const _perPage = 3;

function formatMessage(message) {
  return {
    id: message.id,
    subject: message.subject || null,
    text: message.text,
    createdAt: message.createdAt
  };
}

const TasksStore = Object.assign({}, EventEmitter.prototype, {
  isLoading() {
    return _isLoading;
  },

  getIsAdded() {
    return _isAdded;
  },

  getCurrentPage() {
    return _currentPage;
  },

  getPerPage() {
    return _perPage;
  },

  getLoadingError() {
    return _loadingError;
  },

  getMessages() {
    return _messages;
  },

  getSubject() {
    return _subject;
  },

  getText() {
    return _text;
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register((action) => {
  switch (action.type) {
    case AppConstants.LOAD_MESSAGES_REQUEST: {
      _isAdded = false;
      _isLoading = true;

      TasksStore.emitChange();
      break;
    }

    case AppConstants.LOAD_MESSAGES_SUCCESS: {
      _isLoading = false;
      _messages = action.messages.map(formatMessage);
      _loadingError = null;

      TasksStore.emitChange();
      break;
    }

    case AppConstants.LOAD_MESSAGES_FAIL: {
      _loadingError = action.error;

      TasksStore.emitChange();
      break;
    }

    case AppConstants.SAVE_MESSAGE_VALUES: {
      _isAdded = false;
      _text = action.message.text;
      _subject = action.message.subject;

      TasksStore.emitChange();
      break;
    }

    case AppConstants.CREATE_MESSAGE_SUCCESS: {
      _isAdded = true;
      _text = '';
      _subject = '';

      TasksStore.emitChange();
      break;
    }

    case AppConstants.RESET_IS_ADDED: {
      _isAdded = false;

      TasksStore.emitChange();
      break;
    }

    case AppConstants.INCREMENT_PAGE: {
      if (Math.ceil(_messages.length / _perPage) > _currentPage) _currentPage++;

      TasksStore.emitChange();
      break;
    }

    case AppConstants.DECREMENT_PAGE: {
      if (_currentPage > 1) _currentPage--;

      TasksStore.emitChange();
      break;
    }

    case AppConstants.SET_CURRENT_PAGE: {
      _currentPage = action.currentPage;

      TasksStore.emitChange();
      break;
    }

    default: {
      console.log('No such handler');
    }
  }
});

export default TasksStore;
