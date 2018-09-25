import React, { Component } from 'react';
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
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
        <h1>My Conversations</h1>
        <div className="conversations">
          {this.state.keys &&
            this.state.keys.map(el => (
              <Link
                to={{
                  pathname: '/messaging',
                  state: {
                    receiver: {
                      _id: this.props.store.myMessages[el].messages[0].receiver,
                      username: this.props.store.myMessages[el].messages[0]
                        .receiverName
                    } /*************************** */,
                    sender: this.props.store.currentUser
                  }
                }}
              >
                <h2>{this.state.messages[el].username}</h2>
              </Link>
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
