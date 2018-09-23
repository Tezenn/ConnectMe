import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserInfoTopics extends Component {
  render() {
    return (
      <div className="user_detail">
        <h2>{this.props.user.username}</h2>
        {this.props.user.topics.map(el => {
          return <h4>{el}</h4>;
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
});

export default connect(mapStateToProps)(UserInfoTopics);
