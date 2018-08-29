import React from 'react';
import { API } from 'aws-amplify';
import { Header } from '../fsc/Header';
import { Button } from '../fsc/Button';
import { Table } from '../fsc/Table';
import { Input } from '../fsc/Input';
import { Select } from '../fsc/Select';

export class ViewLogs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiData: undefined,
      tableData: [],
      fromDate: "",
      toDate: "",
      users: ""
    };
    
    this.getTableData();
  }

  componentDidMount() {
    let d = new Date();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let toDate = d.getFullYear() + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
    let fromDate = d.getFullYear() + '-01-01';

    this.setState({fromDate: fromDate});
    this.setState({toDate: toDate});
  }

  getTableData() {
    let apiName = 'Volunteer_LogsCRUD';
    let path = '/Volunteer_Logs';

    API.get(apiName, path).then(response => {
      this.setState({apiData: response.data})
      this.parseTableData();
    }).catch(error => {
      console.log(error.response);
    });
  }

  parseTableData() {
    let tableData = [];
    let apiData = this.state.apiData;

    apiData.forEach(el => {
      let date = new Date(el.date).toISOString();
      let fromDate = new Date(this.state.fromDate).toISOString();
      let toDate = new Date(this.state.toDate).toISOString();
      if (date >= fromDate && date <= toDate) {
        let row = {col1: el.name, col2: el.date, col3: el.location};
        tableData.push(row);
      }
    });

    this.setState({tableData: tableData.reverse()});
  }

  exportData() {
    let data = this.state.apiData;
    var lineArray = [];
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "User, Date, Location, Start Time, End Time, Meal, Cost\r\n";

    data.forEach(function(el){
      let line = el.name + "," + el.date + "," + el.location + "," + el.startTime + "," + el.endTime + "," + el.meal + "," +  el.cost;
      lineArray.push(line);
    }); 
    lineArray = lineArray.reverse();
    csvContent += lineArray.join("\r\n");

    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
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
              <Table col1="User" col2="Date" col3="Location" data={this.state.tableData} select={() => this.props.history.push('/shiftDetails')}/>
              <Button title="Update" color="btn-primary rounded-0 btn-block" onClick={() => this.parseTableData()} />
              <Button title="Export Data" color="btn-danger rounded-0 btn-block" onClick={() => this.exportData()} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
