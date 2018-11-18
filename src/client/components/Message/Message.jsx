import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';

import MessagesActions from '../../actions/MessagesActions';

import Answer from '../Answer';
import ChildMessage from '../ChildMessage';

import './Message.scss';

const propTypes = {
  subject: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  parentId: PropTypes.string.isRequired
};

class Message extends Component {
  constructor(props) {
    super(props);

    this.handleAnswer = this.handleAnswer.bind(this);
    this.setAnswerVisible = this.setAnswerVisible.bind(this);
    this.loadChildMessages = this.loadChildMessages.bind(this);
    this.formatChildMessage = this.formatChildMessage.bind(this);
    this.handleToggleHistory = this.handleToggleHistory.bind(this);

    this.state = {
      childs: [],
      isAnswerVisible: false,
      isChildsLoaded: false,
      isChildsVisible: false
    };
  }

  componentWillMount() {
    this.loadChildMessages(this.props.parentId);
  }

  handleAnswer() {
    this.setAnswerVisible(true);
  }

  handleToggleHistory() {
    this.setState({
      isChildsVisible: !this.state.isChildsVisible
    });
  }

  setAnswerVisible(value) {
    this.setState({ isAnswerVisible: value });
  }

  loadChildMessages(parentId) {
    MessagesActions.loadChildMessages(parentId)
      .then(({ data }) => {
        const childs = data.map(this.formatChildMessage);

        this.setState({
          childs,
          isChildsLoaded: true
        });
      })
      .catch(err =>
        console.error(err)
      );
  }

  formatChildMessage(message) {
    return {
      id: message.id,
      text: message.text,
      createdAt: message.createdAt
    };
  }

  render() {
    const isHistoryButtonVisible = this.state.isChildsLoaded && !!this.state.childs.length;
    const renderChilds = this.state.childs.map((message, index) => {
      return (<ChildMessage key={index} text={message.text} createdAt={message.createdAt}/>);
    });

    return (
      <div className='row message-card card'>
        <div className='card-header'>
          <strong>Тема: {this.props.subject}</strong>
        </div>
        <div className='card-body'>
          <p className='card-text'>{this.props.text}</p>
          <div className='row justify-content-center'>
            <div className='col-auto'><em>{dateFormat(this.props.createdAt)}</em></div>
          </div>
          <hr className='fancy-line col-md-10 col-12 p-0' />
          {
            isHistoryButtonVisible  &&
            <div className='row justify-content-center mb-3'>
              <button className='btn btn-sm btn-outline-secondary' onClick={this.handleToggleHistory}>
                {this.state.isChildsVisible ? 'Скрыть' : `История сообщений (${this.state.childs.length})`}
              </button>
            </div>
          }
          {
            this.state.isChildsVisible &&
            <div className='childs small container col-12 col-md-10'>
              { renderChilds }
            </div>
          }
          {
            !this.state.isAnswerVisible &&
            <div className='row justify-content-center'>
              <button className='answer-button btn btn-primary' onClick={this.handleAnswer}>Ответить</button>
            </div>
          }
          {
            this.state.isAnswerVisible &&
            <div className='answer row mt-4'>
              {
                this.state.isChildsVisible &&
                <hr className='fancy-line col-md-10 col-12 p-0' />
              }
              <Answer setAnswerVisible={this.setAnswerVisible} loadChildMessages={this.loadChildMessages}
                parentId={this.props.parentId}
              />
            </div>
          }
        </div>
      </div>
    );
  }
}

Message.propTypes = propTypes;

export default Message;
