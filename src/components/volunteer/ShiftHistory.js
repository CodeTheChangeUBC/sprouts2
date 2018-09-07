import React from 'react';
import { Auth } from 'aws-amplify';
import { API } from 'aws-amplify';
import { Header } from '../fsc/Header';
import { Table } from '../fsc/Table';


export class ShiftHistory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
      apiData: undefined
    };

    this.getTableData();
  }

  selectRow = (el) => {
    this.props.onSelectRow(this.state.apiData[el]);
    this.props.history.push('/shiftDetails');
  }

  getTableData() {
    Auth.currentSession()
      .then((session) => {
        let apiName = 'Volunteer_LogsCRUD';
        let path = '/Volunteer_Logs/' + session.accessToken.payload.username;

        API.get(apiName, path).then(response => {
          this.setState({apiData: response.reverse()});
          this.parseTableData();
        }).catch(error => {
          console.log(error.response);
        });
      })
      .catch(err => console.log(err));
  }

  parseTableData = () => {
    let tableData = [];
    let apiData = this.state.apiData;

    apiData.forEach(el => {
      let row = {col1: el.name, col2: el.date, col3: el.location};
      tableData.push(row);
    });

    this.setState({tableData: tableData});
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
                select={this.selectRow}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
