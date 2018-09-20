import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AutocompleteSetting from './placesAutocomplete';

class SignUp extends Component {
  state = {
    newUser: {
      username: '',
      location: ''
    },
    next: false
  };

  handleChange = ev => {
    this.setState({
      newUser: {
        ...this.state.newUser,
        [ev.target.name]: ev.target.value
      }
    });
  };

  handleGeo = obj => {
    console.log(obj);
    this.setState({
      newUser: {
        ...this.state.newUser,
        location: obj
      }
    });
  };

  handleSubmit = ev => {
    ev.preventDefault();
    this.props.addNewUser(this.state.newUser);
    this.setState({
      newUser: {
        username: '',
        location: ''
      },
      next: true
    });
  };

  render() {
    if (this.state.next) {
      return <Redirect to="/topicsDefinition" />;
    }
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
            value={this.state.newUser.username}
          />
          <h2>Where do you live?</h2>
          <AutocompleteSetting geo={this.handleGeo} />
          <br />
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    );
  }
}

export default SignUp;
