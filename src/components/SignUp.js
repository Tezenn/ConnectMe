import React, { Component } from "react";

class SignUp extends Component {
  state = {
    newUser: {
      username: "",
      location: ""
    }
  };

  handleChange = ev => {
    this.setState({
      newUser: {
        ...this.state.newUser,
        [ev.target.name]: ev.target.value
      }
    });
  };

  handleSubmit = ev => {
    ev.preventDefault();
    console.log(this.state);
  };

  render() {
    return (
      <div className="topicsDiv">
        <h1>Sign Up Page</h1>
        <form className="topicsDiv" onSubmit={this.handleSubmit}>
          <h2>Choose a User Name</h2>
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={this.handleChange}
          />
          <h2>Where do you live?</h2>
          <input
            type="text"
            placeholder="location"
            name="location"
            onChange={this.handleChange}
          />
          <br />
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    );
  }
}

export default SignUp;
