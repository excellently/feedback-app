import React, { Component } from 'react';

import MessagesStore from '../../stores/MessagesStore';
import MessagesActions from '../../actions/MessagesActions';

import Message from '../Message';

function getStateFromFlux() {
  return {
    isLoading: MessagesStore.isLoading(),
    messages: MessagesStore.getMessages(),
    currentPage: MessagesStore.getCurrentPage(),
    perPage: MessagesStore.getPerPage()
  };
}

class MessagesPage extends Component {
  constructor(props) {
    super(props);

    this._onChange = this._onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = getStateFromFlux();
  }

  componentWillMount() {
    MessagesActions.loadMessages();
  }

  componentDidMount() {
    MessagesStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    MessagesStore.removeChangeListener(this._onChange);
  }

  handleClick(event) {
    event.preventDefault();

    MessagesActions.setCurrentPage(Number(event.target.innerHTML));
  }

  handleDecrementPage() {
    MessagesActions.decrementPage();
  }

  handleIncrementPage() {
    MessagesActions.incrementPage();
  }

  _onChange() {
    this.setState(getStateFromFlux());
  }

  render() {
    const { messages, currentPage, perPage } = this.state;

    const indexOfLastMessage = currentPage * perPage;
    const indexOfFirstMessage = indexOfLastMessage - perPage;
    const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);
    const pagesCount = Math.ceil(messages.length / perPage);
    const isPaginationVisible = pagesCount > 1;

    const renderMessages = currentMessages.map((message, index) => {
      return (
        <Message key={index + indexOfFirstMessage} subject={message.subject}
          text={message.text} createdAt={message.createdAt} parentId={message.id}
        />);
    });

    const pageNumbers = [];

    for (let i = 1; i <= pagesCount; i++) {
      pageNumbers.push(i);
    }
    const renderPageNumbers = pageNumbers
      .filter(number => number - currentPage <= 2 && currentPage - number <= 2)
      .map(number => {
        const liClassName = currentPage === number ? 'page-item active' : 'page-item';

        return (
          <li className={liClassName}
            key={number}
          >
            <a className='page-link' key={number}
              id={`page-${number}`}
              onClick={this.handleClick} href='#'
            >{number}</a>
          </li>
        );
      });

    return (
      <div className='container'>
        {renderMessages}
        {
          isPaginationVisible  &&
          <ul className='pagination container justify-content-center'>
            {currentPage === 1
              ? <li className='page-item disabled'>
                <a className='page-link' onClick={this.handleDecrementPage} tabIndex='-1'>Previous</a>
              </li>
              : <li className='page-item'>
                <a className='page-link' onClick={this.handleDecrementPage}>Previous</a>
              </li>
            }
            {renderPageNumbers}
            {currentPage === pagesCount
              ? <li className='page-item disabled'>
                <a className='page-link' onClick={this.handleIncrementPage} tabIndex='-1'>Next</a>
              </li>
              : <li className='page-item'>
                <a className='page-link' onClick={this.handleIncrementPage}>Next</a>
              </li>
            }
          </ul>
        }
      </div>
    );
  }
}

export default MessagesPage;
