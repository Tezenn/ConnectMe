import React, { Component } from 'react';
import UserInfoTopics from './userInfoTopics';

class Interaction extends Component {
  componentDidMount() {
    this.props.checkMessageBox();
  }
  render() {
    return (
      <div className="user_list">
        {this.props.users.map(el => {
          if (el.username !== this.props.curUser) {
            return <UserInfoTopics user={el} key={el._id} />;
          }
        })}
      </div>
    );
  }
}

export default Interaction;
