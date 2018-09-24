import React, { Component } from 'react';
import Moment from 'react-moment';

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
  }

  handleSubmit = ev => {
    ev.preventDefault();
    fetch('http://localhost:3100/addMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: this.props.location.state.sender._id,
        receiver: this.props.location.state.receiver._id,
        date: Date.now(),
        text: this.state.inpValue
      })
    });
    this.setState({
      messages: [...this.state.messages, { text: this.state.inpValue }]
    });
    this.setState({ inpValue: '' });
  };

  handleChange = ev => {
    this.setState({ inpValue: ev.target.value });
  };

  render() {
    return (
      <div class="App">
        <h1>Send a message to {this.props.location.state.receiver.username}</h1>
        <div className="chatDiv">
          <div className="message_list" />
          <div>
            {this.state.messages.length > 1 ? (
              this.state.messages.map(el => (
                <div>
                  <h4>{el.text}</h4>
                  <Moment format="YY-MM-DD HH:mm">{el.date}</Moment>
                </div>
              ))
            ) : (
              <h4>
                Send a message to {this.props.location.state.receiver.username}{' '}
                to start a conversation
              </h4>
            )}
          </div>
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
