import React, { Component } from 'react';
import './App.css';
import Map from './components/Map';
import Interaction from './components/Interaction';
import TopicsDefinition from './components/topicsDefinition';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Mailbox from './components/Mailbox';
import { connect } from 'react-redux';
import { addNewUser, populateUsers, loadMyMessages } from './redux/actions';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import MessagingComponent from './components/MessagingComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faComments);

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

  //get current geolocation
  getCurrentPosition = async () => {
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(position => {
        if (position) {
          this.currentPos = position;
          this.getCloseUsers(position);
        }
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
        if (res.length > 0) {
          this.props.populateUsers(res);
        }
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

  //checkForMYMessages
  checkMessageBox = async () => {
    console.log(this.props.store.currentUser);
    await fetch('http://localhost:3100/getMyMessages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ receiver: this.props.store.currentUser._id })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.props.loadMyMessages(res);
      });
  };

  componentDidMount() {
    this.getCurrentPosition(); ////////////////////////////////////AWAY
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
                checkMessageBox={this.checkMessageBox}
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
                <div>
                  <Link to="/mailbox">
                    <div className="mailbox_btn">
                      <FontAwesomeIcon icon="comments" size={'3x'} />
                      <h5>Your Conversations</h5>
                    </div>
                  </Link>
                  {this.props.store.users.length > 0 && (
                    <div className="topicsDiv">
                      <Map
                        users={this.props.store.users}
                        currentPos={this.currentPos}
                        getCloseUsers={this.getCloseUsers}
                      />
                      <Interaction
                        checkMessageBox={this.checkMessageBox}
                        curUser={this.props.store.currentUser.username}
                        users={this.props.store.users}
                      />
                    </div>
                  )}
                </div>
              );
            }}
          />
          <Route
            path="/messaging"
            render={props => (
              <MessagingComponent
                {...props}
                currentUser={this.props.store.currentUser}
              />
            )}
          />
          <Route exact path="/mailbox" component={Mailbox} />
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
  populateUsers: users => dispatch(populateUsers(users)),
  loadMyMessages: messages => dispatch(loadMyMessages(messages))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
