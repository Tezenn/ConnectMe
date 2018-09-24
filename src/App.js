import React, { Component } from 'react';
import './App.css';

import Map from './components/Map';
import Interaction from './components/Interaction';
import TopicsDefinition from './components/topicsDefinition';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { connect } from 'react-redux';
import { addNewUser, populateUsers } from './redux/actions';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import MessagingComponent from './components/MessagingComponent';

//const Dump = props => <pre>{JSON.stringify(props, null, 2)}</pre>;

class App extends Component {
  constructor(props) {
    super(props);
    this.currentPos = {};
    this.state = {
      users: []
    };
  }

  topicsDefinition = () => <TopicsDefinition />;

  //load all the users, maybe not needed
  async getData() {
    let users;
    await fetch('http://localhost:3100')
      .then(res => res.json())
      .then(res => (users = res));
    this.setState({ users: users });
  }

  closeMap = () => {
    this.setState({ users: [] });
  };

  //get current geolocation

  getCurrentPosition = async () => {
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(position => {
        this.currentPos = position;
        console.log(
          '*************',
          this.currentPos.coords,
          '******************'
        );
        this.getCloseUsers(position);
      });
    } else console.log('Geolocation unavailable in your browser');
    return;
  };

  //get user near your location
  getCloseUsers = position => {
    console.log('position: ', position.coords);
    fetch('http://localhost:3100/nearMe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        long: position.coords.longitude,
        lat: position.coords.latitude
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.length > 0) this.props.populateUsers(res);
      });
  };

  //log in <O_o>
  logUser = name => {
    fetch('http://localhost:3100/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: name })
    })
      .then(res => res.json())
      .then(res => this.props.addNewUser(res));
  };

  componentDidMount() {
    this.getCurrentPosition();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route
            exact={true}
            path="/"
            render={() => (
              <Login
                logUser={this.logUser}
                currentUser={this.props.store.currentUser}
              />
            )}
          />
          <Route
            exact={true}
            path="/signup"
            render={() => (
              <SignUp
                addNewUser={this.props.addNewUser}
                currentPos={this.currentPos}
              />
            )}
          />
          <Route
            exact={true}
            path="/topicsDefinition"
            render={() => <TopicsDefinition />}
          />
          <Route
            exact={true}
            path="/Map"
            render={() => {
              return (
                <div className="topicsDiv">
                  {this.props.store.users.length > 0 && (
                    <div className="topicsDiv">
                      <Map
                        users={this.props.store.users}
                        currentPos={this.currentPos}
                        getCloseUsers={this.getCloseUsers}
                      />
                      <Interaction users={this.props.store.users} />
                    </div>
                  )}
                </div>
              );
            }}
          />
          <Route path="/messaging/:id" component={MessagingComponent} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  store: state
});

const mapDispatchToProps = dispatch => ({
  addNewUser: newUser => dispatch(addNewUser(newUser)),
  populateUsers: users => dispatch(populateUsers(users))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
