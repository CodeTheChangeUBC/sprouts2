import React from 'react';
import { Table } from './fsc/Table';
import { Header } from './fsc/Header';
import PropTypes from "prop-types";

export class ShiftHistory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      apiData: undefined,
      tableData: []
    };
  }

  private getTableData() {
    let apiName = 'Volunteer_LogsCRUD';
    let path = '/Volunteer_Logs';
    let init = {
      queryStringParameters: {
        name: this.props.username
      }
    };

    API.get(apiName, path, init).then(response => {
      this.setState({
        apiData: response.data
      });
    }).catch(error => {
      console.log(error.response);
    });
  }

  private parseTableData() {
    // TODO
    // parse through this.state.apiData
    // put it into [ row1: { col1: string ... }, ... ] format
    // setState into tableData
  }

  render() {
    <Header title="Shift History" />
    <div className="row">
      <div className="col-12">
        <Table
          col1="USER"
          col2="LOCATION"
          col3="DATE"
          data={this.state.tableData}
        />
      </div>
    </div>
  }
}

ShiftHistory.propTypes = {
  username: PropTypes.string.isRequired
};
