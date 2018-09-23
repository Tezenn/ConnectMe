import React, { Component } from 'react';
import UserInfoTopics from './userInfoTopics';

class Interaction extends Component {
  render() {
    return (
      <div className="user_list">
        {this.props.users.map(el => {
          return <UserInfoTopics user={el} />;
        })}
      </div>
    );
  }
}

export default Interaction;
