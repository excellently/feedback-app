import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';

import './Message.scss';

const propTypes = {
  subject: PropTypes.string,
  text: PropTypes.string,
  createdAt: PropTypes.string
};

class Message extends Component {
  render() {
    return (
      <div className='row message-card card'>
        <div className='card-header'>
          <strong>Тема: {this.props.subject}</strong>
        </div>
        <div className='card-body'>
          <p className='card-text'>{this.props.text}</p>
          <div className='row'>
            <div className='col-auto float-right align-self-end'><em>{dateFormat(this.props.createdAt)}</em></div>
            <button className='btn btn-primary col-auto ml-auto mr-4'>Ответить</button>
          </div>
        </div>
      </div>
    );
  }
}

Message.propTypes = propTypes;

export default Message;
