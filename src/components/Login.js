import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

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
    setTimeout(() => {
      this.props.checkMessageBox();
    }, 500);
    //this.state.inpValue = '';
  };

  render() {
    if (this.props.currentUser.username) return <Redirect to="/Map" />;
    return (
      <div>
        <div className="title">
          <h1>Connect . Me</h1>
          <p>Explore the world map and find interesting people</p>
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
            <button type="submit" value="Log In">
              Log in
            </button>
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  store: state
});

export default connect(mapStateToProps)(Login);
