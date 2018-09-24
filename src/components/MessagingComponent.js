import React, { Component } from 'react';

class MessagingComponent extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  handleSubmit = ev => {
    ev.preventDefault();
  };
  render() {
    return (
      <div>
        <h1>Send a message to *</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" />
          <button type="submit" />
        </form>
      </div>
    );
  }
}

export default MessagingComponent;
