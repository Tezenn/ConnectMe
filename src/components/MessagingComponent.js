import React, { Component } from 'react';
import Moment from 'react-moment';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
library.add(faArrowLeft);

class MessagingComponent extends Component {
  state = {
    inpValue: '',
    messages: []
  };

  componentDidMount() {
    fetch('http://localhost:3100/getMessages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: this.props.location.state.sender._id,
        receiver: this.props.location.state.receiver._id
      })
    })
      .then(res => res.json())
      .then(res => this.setState({ messages: res }));

    setTimeout(() => this.scrollToBottom(), 600);
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  };

  handleSubmit = async ev => {
    ev.preventDefault();
    if (this.state.inpValue.length > 0) {
      await fetch('http://localhost:3100/addMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: this.props.location.state.sender._id,
          receiver: this.props.location.state.receiver._id,
          senderName: this.props.location.state.sender.username,
          receiverName: this.props.location.state.receiver.username,
          date: Date.now(),
          text: this.state.inpValue
        })
      })
        .then(res => res.json())
        .then(res =>
          this.setState({
            messages: [...this.state.messages, res],
            inpValue: ''
          })
        );

      //this.setState({ inpValue: '' });
    }
    this.scrollToBottom();
  };

  handleChange = ev => {
    this.setState({ inpValue: ev.target.value });
  };

  render() {
    return (
      <div className="App">
        <div className="chatTitle">
          <FontAwesomeIcon
            icon="arrow-left"
            size={'2x'}
            onClick={() => this.props.history.goBack()}
          />
          <h1>
            Send a message to {this.props.location.state.receiver.username}
          </h1>
        </div>
        <div className="chatDiv tez">
          <div className="message_list" />
          <div>
            {this.state.messages.length > 0 ? (
              this.state.messages.map(
                el =>
                  el.sender === this.props.currentUser._id ? (
                    <div className="sender_chat">
                      <h4>{el.text}</h4>
                      <Moment format="YY-MM-DD HH:mm">{el.date}</Moment>
                    </div>
                  ) : (
                    <div className="receiver_chat">
                      <h4>{el.text}</h4>
                      <Moment format="YY-MM-DD HH:mm">{el.date}</Moment>
                    </div>
                  )
              )
            ) : (
              <p>
                Send a message to {this.props.location.state.receiver.username}{' '}
                to start a conversation
              </p>
            )}
          </div>
          <div
            style={{ float: 'left', clear: 'both' }}
            ref={el => {
              this.messagesEnd = el;
            }}
          />
        </div>
        <form className="chatForm" onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.inpValue}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}

export default MessagingComponent;
