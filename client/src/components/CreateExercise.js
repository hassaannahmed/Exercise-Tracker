import React, { Component } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

class CreateExercise extends Component {
  constructor(props) {
    super(props);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: []
    };
  }

  onChange(e) {
    console.log(e.target.name);
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onChangeDate(e) {
    this.setState({
      date: e
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const exercise = {
      username: this.state.username,
      duration: this.state.duration,
      date: this.state.date,
      description: this.state.description
    };
    axios
      .post("http://localhost:5000/exercises/add", exercise)
      .then(res => {
        console.log(res);
        console.log("Exercise Posted!");
      })
      .catch(err => console.log(err));
  }
  componentDidMount() {
    var arr = new Array();
    axios
      .get("http://localhost:5000/users/")
      .then(res => {
        if (res.data.length > 0) {
          this.setState({
            users: res.data.map(user => user.username),
            username: res.data[0].username
          });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h3>Create New Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select
              name="username"
              ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChange}
            >
              {this.state.users.map(function(user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              required
              name="description"
              className="form-control"
              value={this.state.description}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input
              name="duration"
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateExercise;
