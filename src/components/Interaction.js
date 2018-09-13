import React, { Component } from "react";

class Interaction extends Component {
  render() {
    return (
      <div>
        <h4>Here will be the messaging ** Interactions-component</h4>
        {this.props.user && <h4>{this.props.user.name}</h4>}
      </div>
    );
  }
}

export default Interaction;
