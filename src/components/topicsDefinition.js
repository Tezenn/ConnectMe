import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateTopics } from "../redux/actions/";

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
        <Link to={"/Map"}>
          <button onClick={() => this.props.updateTopics(this.state.topics)}>
            Next
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  store: state
});

const mapDispatchToProps = dispatch => ({
  updateTopics: topics => dispatch(updateTopics(topics))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicsDefinition);
