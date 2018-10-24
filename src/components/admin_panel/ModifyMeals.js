import React from 'react';
import { API } from 'aws-amplify';
import { Header } from '../fsc/Header';
import { Button } from '../fsc/Button';
import { Table } from '../fsc/Table';
import { Input } from '../fsc/Input';

export class ModifyMeals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiData: undefined,
      tableData: [],
      edit: false,
      newItem: "",
      newPrice: -1
    };
    let selectedRow = false;
    this.getTableData();
  }

  getTableData() {
    let apiName = 'Meal_OptionsCRUD';
    let path = '/Meal_Options';
    API.get(apiName, path).then(response => {
      this.setState({apiData: response.data.reverse()});
      this.parseTableData();
    }).catch(error => {
      console.log("Err " + error);
    });
  }

  parseTableData() {
    let tableData = [];
    let apiData = this.state.apiData;
    apiData.forEach(el => {
        let row = {col1: el.Name, col2: el.Price};
        tableData.push(row);
      }
    );
    this.setState({tableData: tableData});
  }
  
  saveMealOption() {
      let apiName = 'Meal_OptionsCRUD';
      let path = '/Meal_Options';
      let init = {
        body: {
          Name: this.state.newItem,
          Price: this.state.newPrice
        }
      }
      API.put(apiName, path, init).then(response => {
        console.log(response);
        this.selectedRow = false;
        this.getTableData();
        this.setState({newItem: "", newPrice: -1});
      }).catch(error => {
        console.log(error);
      });
  }
  
  addMealOption() {
    let valid = true;
    if (!this.state.edit) {
      this.setState({edit: !this.state.edit});
      valid = false;
    }
    if (this.state.edit) {
      if (this.state.newItem === "") {
        alert("Please enter the name of your new item"); 
        valid = false;
      } else if (this.state.newPrice === -1 || 
        this.state.newPrice === "") {
        alert("Please enter the price of your new item");
        valid = false;
      }
      else if (valid) {
        this.saveMealOption();
        console.log(this.state.newItem + "PRICE : " + this.state.newPrice);
        this.setState({edit: !this.state.edit});
      }
    }
  }
  deleteMealOption() {
    let apiName = 'Meal_OptionsCRUD';
    let path = '/Meal_Options/object';
    path += '/' + this.state.newItem;
    API.del(apiName, path).then(response => {
      console.log(response); 
      this.selectedRow = false;
      this.getTableData();
      this.setState({newItem: "", newPrice: -1});
    }).catch(error => {
      console.log("Err " + error);
    });
  }

  selectRow = (el) => {
    let row = this.state.apiData[el];
    this.selectedRow = true;
    this.setState({newItem: row.Name ,newPrice: row.Price,edit: true})
  }
  render() {
    return (
      <div>
        <Header title="Modify Meal Options" link={() => this.props.history.push('/')}/>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 my-3">
              <div className="pb-5 mb-4">
                <Table col1="Meal" col2="Price" select={this.selectRow} data={this.state.tableData}/>
                <div hidden={!this.state.edit}>
                <Input title="Meal Option" placeholder="Ex. Sandwich" disabled={this.selectedRow} value={this.state.newItem} type="string" 
                  update={(event) => this.setState({newItem: event.target.value})}/>
                <Input title="Price" placeholder="Ex. 7" value={(this.state.newPrice===-1)? "" : this.state.newPrice} type="number" 
                  update={(event) => this.setState({newPrice: event.target.value})}/>
                <div hidden={!this.selectedRow}>
                  <Button title="Update" color="btn-primary rounded-0 btn-block" 
                    onClick={() => this.addMealOption()} />
                  <Button title="Delete" disabled={this.state.newItem === "" || this.state.newPrice === ""}
                    color="btn-danger rounded-0 btn-block" onClick={() => this.deleteMealOption()} />
                  <Button title="Cancel" disabled={!this.state.edit} color="btn-secondary rounded-0 btn-block" 
                    onClick={() => {this.selectedRow = false;
                        this.setState({edit: false, newItem: "", newPrice: ""})}} />

                </div>
              </div>
              <div hidden={this.selectedRow}>
              <Button title={this.state.edit ? "Add" : "Add New Meal Option"} color="btn-primary rounded-0 btn-block" 
                    onClick={() => this.addMealOption()} />
              <Button title="Cancel" disabled={!this.state.edit} color="btn-secondary rounded-0 btn-block" 
                    onClick={() => this.setState({edit: false, newItem: "", newPrice: ""})} />
              </div>
              </div>
              <div className="container bg-white py-1 fixed-bottom">
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
