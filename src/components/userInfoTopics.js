import React, { Component } from 'react';
import { connect } from 'react-redux';

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
        <button>connect</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
});

export default connect(mapStateToProps)(UserInfoTopics);
