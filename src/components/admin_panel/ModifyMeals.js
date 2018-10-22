import React from 'react';
import { API } from 'aws-amplify';
import { Header } from '../fsc/Header';
import { Button } from '../fsc/Button';
import { Table } from '../fsc/Table';
import { Input } from '../fsc/Input';
import { Select } from '../fsc/Select';

export class ModifyMeals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiData: undefined,
      tableData: []
    };
    this.getTableData();
  }

  getTableData() {
    let apiName = 'Meal_OptionsCRUD';
    let path = '/Meal_Options';
    API.get(apiName, path).then(response => {
      console.log(response.body);
      this.setState({apiData: response.data.reverse()});
      console.log(this.state.apiData);
      this.parseTableData();
    }).catch(error => {
      console.log("Err " + error);
    });
  }

  parseTableData() {
    let tableData = [];
    let apiData = this.state.apiData;

    apiData.forEach(el => {
        let row = {col1: el.meal, col2: el.price, col3: el.price};
        tableData.push(row);
      }
    );
    this.setState({tableData: tableData});
    console.log(tableData);
  }
  

  render() {
    return (
      <div>
        <Header title="Modify Meal Options" link={() => this.props.history.push('/')}/>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 my-3">
              <div className="pb-5 mb-4">
                <Table col1="Meal" col2="Price" col3="Price" data={this.state.tableData}/>
              </div>
                <Button title="Add New Meal Option" color="btn-danger rounded-0 btn-block" onClick={() => this.addMealOption} />
              <div className="container bg-white py-1 fixed-bottom">
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
