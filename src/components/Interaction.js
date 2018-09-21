import React, { Component } from 'react';

class Interaction extends Component {
  render() {
    return (
      <div className="user_list">
        {this.props.users.map(el => {
          return (
            <div key={el._id} className="user_detail">
              <h2>{el.username}</h2>
              {el.topics.map(el => {
                return <h4>{el}</h4>;
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Interaction;
