import React from 'react';
import PropTypes from 'prop-types';
import { Auth, API } from 'aws-amplify';
import { Header } from '../fsc/Header';
import { Table } from '../fsc/Table';

export class ShiftHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: []
    };

    this.getTableData();
  }

  selectRow(el) {
    this.props.onSelectRow(this.state.apiData[el]);
    this.props.history.push('/shiftDetails');
  }

  getTableData() {
    Auth.currentSession().then((session) => {
      const apiName = 'Volunteer_LogsCRUD';
      const path = `/Volunteer_Logs/${session.idToken.payload.email}`;
      
      API.get(apiName, path).then((response) => {
        this.parseTableData(response.reverse());
      }).catch((error) => {
        console.log(error.response);
      });
    }).catch(err => {
      console.log(err);
    });
  }

  parseTableData(apiData) {
    let tableData = [];
    apiData.forEach((data) => {
      tableData.push({ col1: data.fullName, col2: data.date, col3: data.location });
    });

    this.setState({ tableData: tableData });
  }

  render() {
    return (
      <div>
        <Header title="Shift History" link={() => this.props.history.push('/')} />
        <div className="container">
          <div className="row">
            <div className="col-12 my-3">
              <Table
                col1="User"
                col2="Date"
                col3="Location"
                data={this.state.tableData}
                select={this.selectRow.bind(this)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ShiftHistory.propTypes = {
  onSelectRow: PropTypes.func,
};

export default ShiftHistory;
