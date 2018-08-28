import React, { Component } from 'react';
import { Header } from '../fsc/Header';
import { Button } from '../fsc/Button';
import { Table } from '../fsc/Table';

export class ManageVolunteers extends Component {
  render() {
    return (
      <div>
        <Header title="Manage Volunteers" link={() => this.props.history.push('/')} />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 my-3">
              <Table col1="Username" col2="Name" col3="Email" data={[{col1: 1, col2: 2, col3: 3},{col1: 4, col2: 5, col3: 6}]}/>
              <Button title="Add User" color="btn-danger rounded-0 btn-block" onClick={() => this.props.history.push('/')} />
              <Button title="Delete User" color="btn-danger rounded-0 btn-block" onClick={() => this.props.history.push('/')} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}