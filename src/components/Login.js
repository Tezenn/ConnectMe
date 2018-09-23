import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inpValue: '',
      show: false
    };
  }

  handleChange = ev => {
    this.setState({ inpValue: ev.target.value });
  };

  handleSubmit = async ev => {
    ev.preventDefault();
    await this.props.logUser(this.state.inpValue);
    //this.state.inpValue = '';
  };

  render() {
    if (this.props.currentUser.username) return <Redirect to="/Map" />;
    return (
      <div>
        <div className="title">
          <h1>Connect . Me</h1>
        </div>
        <div className="choice">
          <Link to={'/signup'}>
            <button>Sign Up</button>
          </Link>
          <button onClick={() => this.setState({ show: true })}>Log In</button>
        </div>
        {this.state.show && (
          <form onSubmit={this.handleSubmit} className="center">
            <h2>Username:</h2>
            <input
              type="text"
              placeholder="Insert Username"
              onChange={this.handleChange}
              value={this.state.inpValue}
            />
            <h2>Password:</h2>
            <input type="password" placeholder="Insert Password" />
            <br />
            <input type="submit" value="Log In" />
          </form>
        )}
      </div>
    );
  }
}

export default Login;
