import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class UserInfoTopics extends Component {
  render() {
    return (
      <div className="user_detail">
        <h2>{this.props.user.username}</h2>
        <ul>
          {this.props.user.topics.map(el => {
            return this.props.currentUser.topics.find(
              topics => topics == el
            ) ? (
              <li className="commonTopic">{el}</li>
            ) : (
              <li>{el}</li>
            );
          })}
        </ul>
        <Link
          to={{
            pathname: '/messaging',
            state: {
              receiver: this.props.user,
              sender: this.props.currentUser
            }
          }}
        >
          <button>connect</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
});

export default connect(mapStateToProps)(UserInfoTopics);
