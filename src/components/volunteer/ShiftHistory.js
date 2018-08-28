import React from 'react';
import PropTypes from "prop-types";
import { API } from 'aws-amplify';
import { Header } from '../fsc/Header';
import { Table } from '../fsc/Table';


export class ShiftHistory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      apiData: undefined,
      tableData: []
    };
  }

  getTableData() {
    let apiName = 'Volunteer_LogsCRUD';
    let path = '/Volunteer_Logs';
    let init = {
      queryStringParameters: {
        name: this.props.username
      }
    };

    API.get(apiName, path, init).then(response => {
      console.log("api response: " + response);
      this.setState({
        apiData: response.data
      });
    }).catch(error => {
      console.log(error.response);
    });
  }

  parseTableData() {
    // TODO
    // parse through this.state.apiData
    // put it into [ row1: { col1: string ... }, ... ] format
    // setState into tableData
  }

  render() {
    return (
      <div>
        <Header title="Shift History" link={() => this.props.history.push('/')} />
        <div className="container">
          <div className="row">
            <div className="col-12 my-3">
              <Table
                col1="USER"
                col2="LOCATION"
                col3="DATE"
                data={this.state.tableData}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ShiftHistory.propTypes = {
  username: PropTypes.string.isRequired
};
