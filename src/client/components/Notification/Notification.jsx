
import React, { Component } from 'react';

import MessagesActions from '../../actions/MessagesActions';

class Notification extends Component {
  handleNotificationClose() {
    MessagesActions.resetIsAdded();
  }

  render() {
    return (
      <div className='alert alert-success alert-dismissible fade show mt-4' role='alert'>
        <strong>Сообщение успешно отправлено!</strong>
        <button type='button' className='close' data-dismiss='alert'
          aria-label='Close' onClick={this.handleNotificationClose}
        ><span aria-hidden='true'>&times;</span>
        </button>
      </div>
    );
  }
}

export default Notification;
