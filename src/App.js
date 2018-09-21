import React, { Component } from 'react';
import './App.css';

import Map from './components/Map';
import Interaction from './components/Interaction';
import TopicsDefinition from './components/topicsDefinition';
import SignUp from './components/SignUp';
import { connect } from 'react-redux';
import { addNewUser } from './redux/actions';

import { BrowserRouter as Router, Route } from 'react-router-dom';

//const Dump = props => <pre>{JSON.stringify(props, null, 2)}</pre>;

class App extends Component {
  constructor(props) {
    super(props);

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
  currentPos = {};
  getCurrentPosition = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.currentPos = position;
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
        this.setState({ users: res });
      });
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
            render={() => <SignUp addNewUser={this.props.addNewUser} />}
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
                  <div className="buttons">
                    {this.state.users.length > 0 ? (
                      <button
                        onClick={() => {
                          this.closeMap();
                        }}
                      >
                        Close Map
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          console.log('******');
                        }}
                      >
                        Localize them
                      </button>
                    )}
                  </div>
                  {this.state.users.length > 0 && (
                    <div>
                      <Map
                        users={this.state.users}
                        currentPos={this.currentPos}
                      />
                      <Interaction users={this.state.users} />
                    </div>
                  )}
                </div>
              );
            }}
          />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  store: state
});

const mapDispatchToProps = dispatch => ({
  addNewUser: newUser => dispatch(addNewUser(newUser))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
