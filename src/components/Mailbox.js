import React, { Component } from 'react';
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
library.add(faArrowLeft);

class Mailbox extends Component {
  state = {
    messages: this.props.store.myMessages,
    keys: Object.keys(this.props.store.myMessages)
  };

  render() {
    return (
      <div>
        <FontAwesomeIcon
          icon="arrow-left"
          size={'2x'}
          onClick={() => this.props.history.goBack()}
        />
        <h1>My Messages</h1>
        <div className="conversations">
          {this.state.keys &&
            this.state.keys.map(el => (
              <h1>{this.state.messages[el].username}</h1>
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  store: state
});

export default connect(mapStateToProps)(Mailbox);
