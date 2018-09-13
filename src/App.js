import React, { Component } from "react";
import "./App.css";

import Map from "./components/Map";
import Interaction from "./components/Interaction";
import TopicsDefinition from "./components/topicsDefinition";
import SignUp from "./components/SignUp";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };
  }

  async getData() {
    let users;

    await fetch("http://localhost:3100")
      .then(res => res.json())
      .then(res => (users = res));
    this.setState({ users: users });
  }

  closeMap = () => {
    this.setState({ users: [] });
  };

  render() {
    return (
      <div className="App">
        <SignUp />
        <TopicsDefinition />
        {this.state.users.length > 0 ? (
          <Map users={this.state.users} />
        ) : (
          <h4>click the button to see them</h4>
        )}
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
        <Interaction user={this.state.currentUser} />
      </div>
    );
  }
}

export default App;
