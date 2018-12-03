import React from 'react';
import PropTypes from 'prop-types';
import { API } from 'aws-amplify';
import { Header } from '../fsc/Header';
import { Button } from '../fsc/Button';
import { Table } from '../fsc/Table';
import { Input } from '../fsc/Input';
import { Select } from '../fsc/Select';

const moment = require('moment');

export class ViewLogs extends React.Component {
  constructor(props) {
    super(props);

    this.apiData = [];
    this.filteredData = [];
    this.state = {
      tableData: [],
      fromDate: this.setDates("from"),
      toDate: this.setDates("to"),
      users: [],
      selectedUser: 'All Users',
    };
    
    this.getTableData();
  }

  setDates(date) {
    const d = new Date();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const monthNumber = month < 10 ? '0' : '';

    if (date === "from") {
      return `${d.getFullYear()}-${monthNumber}${month}-01`;
    } else if (date === "to") {
      return `${d.getFullYear()}-${monthNumber}${month}-${day < 10 ? '0' : ''}${day}`;
    }
  }

  getTableData() {
    const apiName = 'Volunteer_LogsCRUD';
    let path = '/Volunteer_Logs';
    API.get(apiName, path).then((response) => {
      this.apiData = response.data.reverse();
      this.parseTableData();
    }).catch((error) => {
      console.log(`Error ${error}`);
    });
  }

  parseTableData() {
    let tableData = [];
    let filtered = [];
    this.apiData.forEach((el) => {
      const date = new Date(el.date).toISOString();
      let fromDate, toDate;
      try {
        fromDate = new Date(this.state.fromDate).toISOString();
        toDate = new Date(this.state.toDate).toISOString();
      } catch (err) {
        console.log('Invalid date format');
      }
      if (date >= fromDate && date <= toDate) {
        if (this.state.selectedUser === 'All Users') {
          tableData.push({ col1: el.name, col2: el.date, col3: el.location });
          filtered.push(el);
        } else {
          if (this.state.selectedUser === el.name) {
            tableData.push({ col1: el.name, col2: el.date, col3: el.location });
            filtered.push(el);
          }
        }
      }
    });
    this.filteredData = filtered;
    this.setState({ tableData: tableData });
    this.getUsers();
  }

  getUsers() {
    const users = new Set();
    const fromDate = new Date(this.state.fromDate).toISOString();
    const toDate = new Date(this.state.toDate).toISOString();
    this.apiData.forEach(function (el) {
      const date = new Date(el.date).toISOString();
      if (date >= fromDate && date <= toDate) {
        users.add(el.name);
      }
    });
    this.setState({ users: [...users] });
  }

  handleFilter(event) {
    this.setState({
      selectedUser: event.target.value,
    }, () => {
      this.parseTableData();
    });
  }

  exportCSV(lineArray) {
    let csvContent = `data:text/csv;charset=utf-8,${lineArray.join("\r\n")}`;
    window.open(encodeURI(csvContent));
  }

  printShifts(data) {
    let durations = {};
    let costs = {};
    let mealItems = {};
    let lineArray = ['User, Date, Location, Start Time, End Time, Meal, Cost ($)'];
    for (let i = 0; i < this.state.users.length; i++) {
      durations[this.state.users[i]] = 0;
      costs[this.state.users[i]] = 0;
    }
    data.forEach((el) => {
      let mealList = '';
      let end = new moment(el.endTime, 'HH:mm');
      const start = new moment(el.startTime, 'HH:mm');
      const duration = end.diff(start, 'minutes');
      let x = new moment(durations[el.name], 'minutes');

      durations[el.name] = x.add(duration, 'minutes');
      costs[el.name] += Number(el.cost);

      for (let i = 0; i < el.meal.length; i++) {
        const meal = el.meal[i][0];
        if (!mealItems[meal]) {
          mealItems[meal] = 1;
        } else {
          mealItems[meal]++;
        }
        mealList += (meal + "; ");
      }
      const line = `${el.name},${el.date},${el.location},${el.startTime},${el.endTime},${mealList},${el.cost}`;
      lineArray.push(line);
    });
    lineArray = this.printUserStats(lineArray, durations, costs);
    lineArray = this.printMealCount(lineArray, mealItems);
    return lineArray;
  }

  printUserStats(lineArray, durations, costs) {
    let output = [...lineArray, '\r\n', 'User, Time (HH:mm), Total Cost ($)'];
    for (let i = 0; i < this.state.users.length; i++) {
      const user = this.state.users[i];
      let x = new moment(durations[user], 'mm');
      durations[user] = x.format('HH:mm');
      if (durations[user] !== '00:00') {
        output.push(`${user},${durations[user]},${costs[user]}`);
      }
    }
    return output;
  }

  printMealCount(lineArray, mealItems) {
    let output = [...lineArray, '\r\n', 'Meal Option, Quantity'];
    const mealOptions = Object.keys(mealItems);
    for (let i = 0; i < mealOptions.length; i++) {
      output.push(`${mealOptions[i]},${mealItems[mealOptions[i]]}`);
    }
    return output;
  }

  selectRow(el) {
    const row = this.filteredData[el];
    this.props.onSelectRow(row);
    this.props.history.push('/shiftDetails');
  }

  render() {
    return (
      <div>
        <Header title="View Logs" link={() => this.props.history.push('/')} />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 my-3">
              <Input
                value={this.state.fromDate}
                title="From date"
                placeholder="From date"
                type="date"
                update={(event) => {
                  this.setState({ fromDate: event.target.value }, () => {
                    this.parseTableData();
                  });
                }}
              />
              <Input
                value={this.state.toDate}
                title="To date"
                placeholder="To date"
                type="date"
                update={(event) => {
                  this.setState({ toDate: event.target.value }, () => {
                    this.parseTableData();
                  });
                }}
              />
              <Select
                value={this.state.selectedUser}
                dropdown={this.state.users}
                title="Volunteer"
                default="All Users"
                placeholder="Volunteer"
                update={event => this.handleFilter(event)}
              />
              <div className="pb-5 mb-4">
                <Table col1="User" col2="Date" col3="Location" data={this.state.tableData} select={this.selectRow.bind(this)} />
              </div>
              <div className="container bg-white py-1 fixed-bottom">
                <Button title="Export Data" color="btn-danger rounded-0 btn-block" onClick={() => this.exportCSV(this.printShifts([...this.filteredData]))} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ViewLogs.propTypes = {
  onSelectRow: PropTypes.func,
};

export default ViewLogs;
