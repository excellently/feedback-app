import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';


const propTypes = {
  text: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired
};

class ChildMessage extends Component {
  render() {
    return (
      <div className='row message-card card'>
        <div className='card-body'>
          <p className='card-text'>{this.props.text}</p>
          <div className='row justify-content-center'>
            <div className='col-auto'><em>{dateFormat(this.props.createdAt)}</em></div>
          </div>
        </div>
      </div>
    );
  }
}

ChildMessage.propTypes = propTypes;

export default ChildMessage;
