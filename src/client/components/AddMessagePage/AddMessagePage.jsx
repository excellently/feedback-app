import React, { Component } from 'react';

import MessagesStore from '../../stores/MessagesStore';
import MessagesActions from '../../actions/MessagesActions';

import Notification from '../Notification';

import './AddMessagePage.scss';

function getStateFromFlux() {
  return {
    isLoading: MessagesStore.isLoading(),
    subject: MessagesStore.getSubject(),
    text:  MessagesStore.getText(),
    isAdded:  MessagesStore.getIsAdded()
  };
}

class AddMessagePage extends Component {
  constructor(props) {
    super(props);

    this.handleSubjectChange = this.handleSubjectChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleMessageAdd = this.handleMessageAdd.bind(this);
    this._onChange = this._onChange.bind(this);

    this.state = getStateFromFlux();
  }

  componentDidMount() {
    MessagesStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    MessagesActions.saveMessageValues({
      subject: this.state.subject || '',
      text: this.state.text || ''
    });

    MessagesStore.removeChangeListener(this._onChange);
  }

  handleTextChange(event) {
    MessagesActions.resetIsAdded();

    this.setState({
      text: event.target.value,
      subject: this.state.subject
    });
  }

  handleSubjectChange(event) {
    MessagesActions.resetIsAdded();

    this.setState({
      subject: event.target.value,
      text: this.state.text
    });
  }

  handleMessageAdd(event) {
    event.preventDefault();
    const newMessage = {
      subject: this.state.subject || '',
      text: this.state.text || ''
    };

    MessagesActions.createMessage(newMessage);
  }

  _onChange() {
    this.setState(getStateFromFlux());
  }

  render() {
    return (
      <div className='add-message col-10 col-md-8 col-lg-6'>
        <h3 className='add-message__title'>Отправка сообщения</h3>
        <form className='container add-message__form'>
          <div className='form-group row'>
            <label htmlFor='subject'>Тема</label>
            <input type='text' className='form-control' id='subject'
              placeholder='Введите тему сообщения' value={this.state.subject} onChange={this.handleSubjectChange}
              required
            />
          </div>
          <div className='form-group row'>
            <label htmlFor='text'>Текст</label>
            <textarea className='form-control' rows='5' id='text'
              placeholder='Введите текст сообщения' value={this.state.text} onChange={this.handleTextChange}
              required
            />
          </div>
          <div className='row justify-content-center'>
            <button disabled={this.state.isLoading || !this.state.subject || !this.state.text} onClick={this.handleMessageAdd}
              className='btn btn-primary'
            >Отправить</button>
          </div>
          <div className='row justify-content-center '>
            {
              this.state.isAdded &&
              <Notification />
            }
          </div>
        </form>
      </div>
    );
  }
}

export default AddMessagePage;
