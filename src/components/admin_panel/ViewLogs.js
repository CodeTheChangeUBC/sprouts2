import React from 'react';
import { API } from 'aws-amplify';
import { Header } from '../fsc/Header';
import { Button } from '../fsc/Button';
import { Table } from '../fsc/Table';
import { Input } from '../fsc/Input';
import { Select } from '../fsc/Select';
let moment = require('moment');

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
    API.get(apiName, path).then(response => {
      if (all) {
        this.setState({apiData: response.data.reverse()});
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
      let fromDate;
      let toDate
      try {
        fromDate = new Date(this.state.fromDate).toISOString();
        toDate = new Date(this.state.toDate).toISOString();
      } catch (err) {
        console.log("invalid date format");
      }
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
    let data = this.filteredData;
    let users = this.state.users;
    let exportData = this.printShifts(users, data);
    this.exportCSV(exportData);
  }
  
  exportCSV(lineArray) {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += lineArray.join("\r\n");
    let encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  }
  
  printShifts(userList, data) {
    let durations = {};
    let costs = {};
    let mealItems = {}
    let users = userList;
    let lineArray = [];
    for (let i = 0; i < users.length; i++) {
      durations[users[i]] = 0;
      costs[users[i]] = 0;
    }
    lineArray.push("User, Date, Location, Start Time, End Time, Meal, Cost ($)");
    data.forEach(function (el) {
      let mealList = "";
      let end = new moment(el.endTime, 'HH:mm');
      let start = new moment(el.startTime, 'HH:mm');
      let duration = end.diff(start, 'minutes');
      let x = new moment(durations[el.name], 'minutes');

      durations[el.name] = x.add(duration, 'minutes');
      costs[el.name] += Number(el.cost);

      for (let i = 0; i < el.meal.length; i++) {
        let meal = el.meal[i][0];
        if (!mealItems[meal]) {
          mealItems[meal] = 1;
        } else {
          mealItems[meal]++;
        }
        mealList += (meal + "; ");
      }
      let line = el.name + "," + el.date + "," + el.location + "," + el.startTime + "," + el.endTime + "," + mealList + "," + el.cost;
      lineArray.push(line);
    });
    lineArray = this.printUserStats(lineArray, users, durations, costs);
    lineArray = this.printMealCount(lineArray, mealItems);
    return lineArray;
  }

  printUserStats(lineArray, users, durations, costs) {
    let output = lineArray;
    output.push("\r\n");
    output.push("User, Time (HH:mm), Total Cost ($)");
    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      let x = new moment(durations[user], 'mm');
      durations[user] = x.format('HH:mm');
      if (durations[user] !== "00:00") {
        let line = user + "," + durations[user] + "," + costs[user];
        output.push(line);
      }
    }
    return output;
  }

  printMealCount(lineArray, mealItems) {
    let output = lineArray;
    output.push("\r\n");
    output.push("Meal Option, Quantity");
    let mealOptions = Object.keys(mealItems);
    for (let i = 0; i < mealOptions.length; i++) {
      let line = mealOptions[i] + ',' + mealItems[mealOptions[i]];
      output.push(line);
    }
    return output;
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
                <Button title="Export Data" color="btn-danger rounded-0 btn-block" onClick={() => this.exportData()} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
