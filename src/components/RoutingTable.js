import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Admin Panel Views
import { AdminOptions } from './admin_panel/AdminOptions';
import { ViewLogs } from './admin_panel/ViewLogs';
import { ShiftDetails } from './admin_panel/ShiftDetails';
import { ModifyMeals } from './admin_panel/ModifyMeals';
// Volunteer Views
import { Options } from './volunteer/VolunteerOptions';
import { LogHours } from './volunteer/LogHours';
import { ShiftHistory } from './volunteer/ShiftHistory';

export class RoutingTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      date: "",
      location: "",
      startTime: "",
      endTIme: "",
      meal: "",
      cost: ""
    };
  }

  handleSelectRow = (value) => {
    this.setState({
      name: value.name,
      date: value.date,
      location: value.location,
      startTime: value.startTime,
      endTime: value.endTime,
      meal: value.meal,
      cost: value.cost
    });
  }

  render() {
    if(this.props.userGroup === 'volunteer') {
      return (
        <Router>
          <div>
            <Route exact path="/" component={Options}/>
            <Route path="/logHours" component={LogHours}/>
            <Route path="/shiftHistory" render={(props) => <ShiftHistory {...props} onSelectRow={this.handleSelectRow} />}/>
            <Route path="/shiftDetails"
            render = {
                (props) => <ShiftDetails {...props}
                  name = {this.state.name}
                  date = {this.state.date}
                  location = {this.state.location}
                  startTime = {this.state.startTime}
                  endTime = {this.state.endTime}
                  meal = {this.state.meal}
                  cost = {this.state.cost}
                  backLink = "/shiftHistory"
                />}/>
          </div>
        </Router>
      );
    }

    if(this.props.userGroup === 'sprouts-admin') {
      return (
        <Router>
          <div>
            <Route exact path="/" component={AdminOptions}/>
            <Route path="/logHours" component={LogHours}/>
            <Route path="/modifyMeals" component={ModifyMeals}/>
            <Route path="/viewLogs" render={(props) => <ViewLogs {...props} onSelectRow={this.handleSelectRow} />}/>
            <Route path="/shiftDetails" 
            render = {
                (props) => <ShiftDetails {...props}
                  name = {this.state.name}
                  date = {this.state.date}
                  location = {this.state.location}
                  startTime = {this.state.startTime}
                  endTime = {this.state.endTime}
                  meal = {this.state.meal}
                  cost = {this.state.cost}
                  backLink = "/viewLogs"
                />}/>
          </div>
        </Router>
      );
    }
  }
}