import React, { Component } from 'react';
import { Header } from '../fsc/Header';
import { Button } from '../fsc/Button';
import { Table } from '../fsc/Table';
import { Input } from '../fsc/Input';
import { Select } from '../fsc/Select';

export class ViewLogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromDate: "",
      toDate: "",
      users: ""
    };
  }

  render() {
    return (
      <div>
        <Header title="View Logs" link={() => this.props.history.push('/')}/>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 my-3">
              <Input value={this.state.fromDate} title="From date" placeholder="From date" type="date" update={(event) => this.setState({fromDate: event.target.value})}/>
              <Input value={this.state.toDate} title="To date" placeholder="To date" type="date" update={(event) => this.setState({toDate: event.target.value})}/>
              <Select value={this.state.users} title="Users" update={(event) => this.setState({users: event.target.value})} dropdown={["All users", "Volunteers", "Administrators"]} />
              <Table col1="Username" col2="Location" col3="Date" data={[{col1: 1, col2: 2, col3: 3},{col1: 4, col2: 5, col3: 6}]}/>
              <Button title="Export Data" color="btn-danger rounded-0 btn-block" onClick={() => console.log("Data: " + this.state.fromDate + ", " + this.state.toDate + ", " + this.state.users)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}