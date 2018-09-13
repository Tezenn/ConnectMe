import React, { Component } from "react";

class SignUp extends Component {
  render() {
    return (
      <div className="topicsDiv">
        <h1>Sign Up Page</h1>
        <form className="topicsDiv">
          <h2>Choose a User Name</h2>
          <input type="text" placeholder="username" name="username" />
          <h2>Where do you live?</h2>
          <input type="text" placeholder="location" name="location" />
          <br />
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    );
  }
}

export default SignUp;
