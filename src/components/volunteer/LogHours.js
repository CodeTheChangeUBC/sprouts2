import React, { Component } from 'react';
import { Header } from '../fsc/Header';
import { Button } from '../fsc/Button';
import { Input } from '../fsc/Input';
import { Select } from '../fsc/Select';

export class LogHours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      startTime: "",
      endTime: "",
      location: "",
      meal: ""
    };
  }

  componentDidMount() {
    // TODO: change these to current date and time
    this.setState({date: "2019-01-01"});
    this.setState({startTime: "01:00"});
    this.setState({endTime: "13:00"});
  }

  render() {
    return (
      <div>
        <Header title="Log Hours" link={() => this.props.history.push('/')}/>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 my-3">
              <Input value={this.state.date} title="Date"  type="date" update={(event) => this.setState({date: event.target.value})}/>
              <Input value={this.state.startTime} title="Start time" type="time" update={(event) => this.setState({startTime: event.target.value})}/>
              <Input value={this.state.endTime} title="End time" type="time" update={(event) => this.setState({endTime: event.target.value})}/>
              <Select value={this.state.location} title="Location" update={(event) => this.setState({location: event.target.value})} dropdown={["Sprouts Cafe", "Option 2", "Option 3"]} />
              <Select value={this.state.meal} title="Meal" update={(event) => this.setState({meal: event.target.value})} dropdown={["Sandwich", "Coffee", "Cookie"]} />
              <Button title="Export Data" color="btn-danger rounded-0 btn-block" onClick={() => console.log("Data: " + this.state.date + ", " + this.state.startTime + ", " + this.state.endTime + ", " + this.state.location + ", " + this.state.meal)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}