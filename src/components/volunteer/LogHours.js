import React, { Component } from 'react';
import { API } from 'aws-amplify';
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
    let d = new Date();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let startHour = d.getHours() - 6;
    let endHour = d.getHours();
    let minute = d.getMinutes();
    let date = d.getFullYear() + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
    let startTime = (startHour < 10 ? '0' : '') + startHour + ':' + (minute < 10 ? '0' : '') + minute;
    let endTime = (endHour < 10 ? '0' : '') + endHour + ':' + (minute < 10 ? '0' : '') + minute;

    this.setState({date: date});
    this.setState({startTime: startTime});
    this.setState({endTime: endTime});
  }

  handleSubmit() {
    //TODO: make a post request to the db
    let apiName = 'Volunteer_LogsCRUD'; // replace this with your api name.
    let path = '/Volunteer_Logs'; //replace this with the path you have configured on your API
    API.get(apiName, path).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error.response)
    });
    
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
              <Button title="Submit" color="btn-primary rounded-0 btn-block" onClick={ this.handleSubmit } />
            </div>
          </div>
        </div>
      </div>
    );
  }
}