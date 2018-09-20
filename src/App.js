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
                          this.getData();
                        }}
                      >
                        Localize them
                      </button>
                    )}
                  </div>
                  {this.state.users.length > 0 && (
                    <Map users={this.state.users} />
                  )}
                </div>
              );
            }}
          />
          <Interaction user={this.state.currentUser} />
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
