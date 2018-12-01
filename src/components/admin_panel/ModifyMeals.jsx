import React from 'react';
import { API } from 'aws-amplify';
import { Header } from '../fsc/Header';
import { Button } from '../fsc/Button';
import { Table } from '../fsc/Table';
import { Input } from '../fsc/Input';

export class ModifyMeals extends React.Component {
  constructor(props) {
    super(props);
    
    this.selectedRow = false;
    this.apiData = [];
    this.state = {
      tableData: [],
      edit: false,
      newItem: '',
      newPrice: -1,
    };

    this.getTableData();
  }

  async getTableData() {
    const apiName = 'Meal_OptionsCRUD';
    const path = '/Meal_Options';
    API.get(apiName, path).then((response) => {
      this.apiData = response.data.reverse();
      this.parseTableData();
    }).catch((error) => {
      console.log(error);
    });
  }

  parseTableData() {
    let tableData = []
    this.apiData.forEach((data) => {
      tableData.push({ col1: data.Name, col2: data.Price });
    });
    this.setState({ tableData: tableData });
  }

  addMealOption() {
    const { edit } = this.state;
    if (edit && this.isValidandComplete()) {
      this.saveMealOption(!edit);
    } else if (!edit) {
      this.setState({ edit: !edit });
    }
  }

  isValidandComplete() {
    const { newItem, newPrice } = this.state;
    let valid = true;
    if (newItem === '') {
      alert('Please enter the name of your new item.');
      valid = false;
    } else if (newPrice === -1 || newPrice === '') {
      alert('Please enter the price of your new item.');
      valid = false;
    } else if (newPrice < 0) {
      alert('Please enter a valid price for your new item.');
      valid = false;
    }
    return valid;
  }

  saveMealOption(edit) {
    const apiName = 'Meal_OptionsCRUD';
    const path = '/Meal_Options';
    const init = {
      body: {
        Name: this.state.newItem.trim(),
        Price: this.state.newPrice,
      },
    };
    API.put(apiName, path, init).then((response) => {
      this.selectedRow = false;
      this.getTableData();
      this.setState({
        newItem: '',
        newPrice: -1,
        edit: edit,
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  deleteMealOption() {
    const confirmation = window.confirm('Are you sure you would like to delete this option?');
    if (confirmation) {
      const apiName = 'Meal_OptionsCRUD';
      const path = `/Meal_Options/object/${this.state.newItem}`;
      API.del(apiName, path).then((response) => {
        this.selectedRow = false;
        this.getTableData();
        this.setState({
          newItem: '',
          newPrice: -1,
          edit: false,
        });
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  selectRow(i) {
    const row = this.apiData[i];
    this.selectedRow = true;
    this.setState({
      newItem: row.Name,
      newPrice: row.Price,
      edit: true,
    });
  }

  render() {
    return (
      <div>
        <Header title="Modify Meal Options" link={() => this.props.history.push('/')} />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 my-3">
              <div className="pb-5 mb-4">
                <Table col1="Meal" col2="Price" select={this.selectRow.bind(this)} data={this.state.tableData} />
                <div hidden={!this.state.edit}>
                  <Input
                    title="Meal Option"
                    placeholder="Ex. Sandwich"
                    disabled={this.selectedRow}
                    value={this.state.newItem}
                    type="string"
                    update={event => this.setState({ newItem: event.target.value })}
                  />
                  <Input
                    title="Price"
                    placeholder="Ex. 7"
                    value={this.state.newPrice === -1 ? '' : this.state.newPrice}
                    type="number"
                    update={event => this.setState({ newPrice: event.target.value })}
                  />
                  <div hidden={!this.selectedRow}>
                    <Button
                      title="Update"
                      color="btn-primary rounded-0 btn-block"
                      onClick={this.addMealOption.bind(this)}
                    />
                    <Button
                      title="Delete"
                      disabled={this.state.newItem === '' || this.state.newPrice === ''}
                      color="btn-danger rounded-0 btn-block"
                      onClick={this.deleteMealOption.bind(this)}
                    />
                    <Button
                      title="Cancel"
                      disabled={!this.state.edit}
                      color="btn-secondary rounded-0 btn-block"
                      onClick={() => {
                        this.selectedRow = false;
                        this.setState({ edit: false, newItem: '', newPrice: '' });
                      }}
                    />
                  </div>
                </div>
                <div hidden={this.selectedRow}>
                  <Button
                    title={this.state.edit ? 'Add' : 'Add New Meal Option'}
                    color="btn-primary rounded-0 btn-block"
                    onClick={this.addMealOption.bind(this)}
                  />
                  <Button
                    title="Cancel"
                    disabled={!this.state.edit}
                    color="btn-secondary rounded-0 btn-block"
                    onClick={() => this.setState({ edit: false, newItem: '', newPrice: '' })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModifyMeals;
