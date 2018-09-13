import React, { Component } from "react";

class TopicsDefinition extends Component {
  state = {
    topics: [],
    inpValue: ""
  };

  handleChange = ev => {
    this.setState({
      inpValue: ev.target.value
    });
  };

  handleSubmit = ev => {
    ev.preventDefault();
    this.setState({
      topics: [...this.state.topics, this.state.inpValue],
      inpValue: ""
    });
  };

  render() {
    return (
      <div className="topicsDiv">
        <h3>Chose Your Topics</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Add one topic at the time"
            onChange={this.handleChange}
            value={this.state.inpValue}
          />
          <input type="submit" value="Add Topic" />
        </form>

        <div>
          <h3>Here are your topics</h3>
          {this.state.topics.map(el => {
            return <h4 key={el}>{el}</h4>;
          })}
        </div>
      </div>
    );
  }
}

export default TopicsDefinition;
