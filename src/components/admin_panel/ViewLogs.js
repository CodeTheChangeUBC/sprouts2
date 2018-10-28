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
      users: [],
      selectedUser: "All Users"
    };
    // Select rows from filteredData, not from ApiData
    let filteredData = [];
    this.getTableData();
  }

  componentDidMount() {
    let d = new Date();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let toDate = d.getFullYear() + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
    let fromDate = d.getFullYear() + '-' + (month < 10 ? '0' : '') + month + '-01'; 

    this.setState({
      fromDate: fromDate, 
      toDate: toDate});
  }

  getTableData() {
    let apiName = 'Volunteer_LogsCRUD';
    let path = '/Volunteer_Logs';
    let all = true;
    if (this.state.selectedUser!=="All Users") {
      path = '/Volunteer_Logs/' + this.state.selectedUser;
      all = false;
    }
    console.log(path);
    API.get(apiName, path).then(response => {
      console.log(response.data);
      if (all) {
        this.setState({apiData: response.data.reverse()}, () => console.log(this.state.apiData));
      } else {
        this.setState({apiData: response.reverse()});
      }
      this.parseTableData();
    }).catch(error => {
      console.log("Err " + error);
    });
  }

  parseTableData() {
    let tableData = [];
    let apiData = this.state.apiData;
    let allUsers = [];
    let filtered = [];
    apiData.forEach(el => {
      let date = new Date(el.date).toISOString();
      let fromDate = new Date(this.state.fromDate).toISOString();
      let toDate = new Date(this.state.toDate).toISOString();
      if (date >= fromDate && date <= toDate) {
        let row = {col1: el.name, col2: el.date, col3: el.location};
        tableData.push(row);
        filtered.push(el);
      }
      allUsers.push(el.name);
    });
    if (this.state.users.length === 0) {
      let filterUsers = new Set(allUsers);
      let arrUsers = [];
      filterUsers.forEach(x => {
        arrUsers.push(x);
      });
      this.setState({users: arrUsers});
    }
    this.filteredData = filtered;
    this.setState({tableData: tableData});
  }
  handleFilter(event) {
    this.setState({
      selectedUser: event.target.value
    }, () => {
      this.getTableData();
    });
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
    csvContent += lineArray.join("\r\n");

    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  }

  selectRow = (el) => {
    this.props.onSelectRow(this.filteredData[el]);
    this.props.history.push('/shiftDetails');
  }

  render() {
    return (
      <div>
        <Header title="View Logs" link={() => this.props.history.push('/')}/>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 my-3">
              <Input value={this.state.fromDate} title="From date" placeholder="From date" type="date" 
                  update={(event) => {
                    this.setState({fromDate: event.target.value}, () => {
                      this.parseTableData();
                    });
                  }}/>
              <Input value={this.state.toDate} title="To date" placeholder="To date" type="date" 
                  update={(event) => {
                    this.setState({toDate: event.target.value}, () => {
                      this.parseTableData();
                    });
                  }}/>
              <Select value={this.state.selectedUser} dropdown={this.state.users} title="Volunteer" 
                  default={"All Users"} placeholder="Volunteer" update={event => this.handleFilter(event)}/>
              <div className="pb-5 mb-4">
                <Table col1="User" col2="Date" col3="Location" data={this.state.tableData} select={this.selectRow}/>
              </div>
              <div className="container bg-white py-1 fixed-bottom">
                {/* <Button title="Update" color="btn-primary rounded-0 btn-block" onClick={() => this.parseTableData()} /> */}
                <Button title="Export Data" color="btn-danger rounded-0 btn-block" onClick={() => this.exportData()} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
