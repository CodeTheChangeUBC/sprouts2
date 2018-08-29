import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Admin Panel Views
import { AdminOptions } from './admin_panel/AdminOptions';
import { ManageVolunteers } from './admin_panel/ManageVolunteers';
import { ViewLogs } from './admin_panel/ViewLogs';
import { ShiftDetails } from './admin_panel/ShiftDetails';

// Volunteer Views
import { Options } from './volunteer/Options';
import { LogHours } from './volunteer/LogHours';
import { ShiftHistory } from './volunteer/ShiftHistory';

export class RoutingTable extends Component {
  render() {
    if(this.props.userGroup === 'volunteer') {
      return (
        <Router>
          <div>
            <Route exact path="/" component={Options}/>
            <Route path="/logHours" component={LogHours}/>
            <Route path="/shiftHistory" component={ShiftHistory}/>
          </div>
        </Router>
      );
    }

    if(this.props.userGroup === 'sprouts-admin') {
      return (
        <Router>
          <div>
            <Route exact path="/" component={AdminOptions}/>
            <Route path="/manageVolunteers" component={ManageVolunteers}/>
            <Route path="/viewLogs" component={ViewLogs}/>
            <Route path="/shiftDetails" render={(props) => <ShiftDetails {...props} name="asdf" />}/>
          </div>
        </Router>
      );
    }
  }
}