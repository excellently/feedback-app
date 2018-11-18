import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MessagesActions from '../../actions/MessagesActions';

const propTypes = {
  setAnswerVisible: PropTypes.func.isRequired,
  loadChildMessages: PropTypes.func.isRequired,
  parentId: PropTypes.string.isRequired
};

class Answer extends Component {
  constructor(props) {
    super(props);

    this.handleCancel = this.handleCancel.bind(this);
    this.handleAnswerAdd = this.handleAnswerAdd.bind(this);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);

    this.state = {
      answer: ''
    };
  }

  handleAnswerAdd() {
    const newChildMessage = {
      text: this.state.answer || '',
      parentId: this.props.parentId
    };

    MessagesActions.createChildMessage(newChildMessage)
      .then(() => {
        this.props.loadChildMessages(this.props.parentId);
        this.setState({ answer: '' });
      })
      .catch(err =>
        console.error(err)
      );
  }

  handleAnswerChange(event) {
    this.setState({
      answer: event.target.value
    });
  }

  handleCancel() {
    this.props.setAnswerVisible(false);
  }

  render() {
    return (
      <div className='col-12 col-md-8 container'>
        <div className='form-group ml-auto mr-auto row'>
          <label htmlFor='answer'>Ответ:</label>
          <textarea className='form-control' rows='4' id='answer'
            onChange={this.handleAnswerChange} value={this.state.answer}  required
          />
        </div>
        <div className='row justify-content-around'>
          <button onClick={this.handleAnswerAdd} className='btn btn-primary'
            disabled={this.state.isLoading || !this.state.answer}
          >Отправить</button>
          <button onClick={this.handleCancel}
            className='btn btn-outline-danger'
          >Отмена</button>
        </div>

      </div>
    );
  }
}

Answer.propTypes = propTypes;

export default Answer;
