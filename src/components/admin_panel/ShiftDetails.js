import React from 'react';
import { Header } from '../fsc/Header';
import { Input } from '../fsc/Input';
import { Button } from '../fsc/Button';
import { Select } from '../fsc/Select';
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { API } from 'aws-amplify';


export class ShiftDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      name: this.props.name,
      date: this.props.date,
      location: this.props.location,
      startTime: this.props.startTime,
      endTime: this.props.endTime,
      num: this.props.meal.length,
      meal: this.props.meal,
      cost: this.props.cost,
      edit: false,
      mealOptions: {
        Sandwich: "7",
        Coffee: "3",
        Cookie: "1",
        None: "0"
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createMealInputs = this.createMealInputs.bind(this);
    this.addMeal = this.addMeal.bind(this);
    this.createLocationInputs = this.createLocationInputs.bind(this);
    this.setMealAndCost = this.setMealAndCost.bind(this);
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.removeMeal = this.removeMeal.bind(this);
  }
  getDefaultState() {
    
  }

  removeMeal (meal) {
    let newMeal = this.state.meal;
    let x = newMeal.indexOf(meal);
    if (x >= 0 && this.state.num>1) {
      newMeal.splice(x,1);
      this.setState({meal: newMeal});
  
      let num =this.state.num-1;
      this.setState({num: num});
  
      let newCost = this.state.cost -meal[1];
      this.setState({cost: newCost});
    }
  }

  // Render Add Meal dropdown
  createMealInputs () {
    let mealList =[];
    if (!this.state.edit) {
      for(let i=0; i<this.state.meal.length; i++) {
        mealList.push(this.state.meal[i][0]);
      }
    return ( 
        <Input title="Meal" renderTitle={true} 
                value={mealList.toString()}
                disabled={true}/>
      );
     }
     else {
      let output = [];
      output.push(
        <div key={0}> 
          <h6>Meal</h6>
        </div>
      )
      for(let i=0; i<this.state.num; i++) {
        output.push(
          <div key={i+1} className="row">
            <div className={(this.state.num>1 && this.state.edit)? "col-8 col-sm-9 col-md-10" : "col-12"}>
              <Select
                renderTitle={false}
                value = {this.state.meal[i][0]}
                title = "Meal"
                update = { (event) => this.setMealAndCost(event, i)}
                dropdown = {Object.keys(this.state.mealOptions)}/>
            </div>
            {(this.state.num>1 && this.state.edit)? (
                <div className="col-4 col-sm-3 col-md-2 pl-0 mb-3 text-right">
                  <button type="button" className="btn btn-outline-danger" aria-label="Close" onClick={ (event) => this.removeMeal(this.state.meal[i])}>
                    Remove
                  </button>
                </div>
              ) : ""
            }
          </div>
        );
      }
      return output;
    }
  }

  handleChangeLocation (event) {
    this.setState({location: event.target.value});
    event.value = this.state.location;
  }

  // Change Location Input field to Dropdown on Edit
  createLocationInputs = () => {
    if (!this.state.edit) {
      return ( 
        <Input title="Location" renderTitle={true} 
                value={this.state.location}
                disabled={true} />
      );
     } else {
      return (<Select title="Location" renderTitle={true}
      value={this.state.location}
      update={this.handleChangeLocation}
      dropdown={["Sprouts Cafe", "Option 2", "Option 3"]}
      />
      )
    } 
  }

  setMealAndCost(event, i) {
    let newMeal = this.state.meal;
    newMeal[i][0] = event.target.value;
    if (this.state.mealOptions[event.target.value]) {
      newMeal[i][1] = this.state.mealOptions[event.target.value];
    } 
    else  {
      //alert("Meal changed to Choose");
      newMeal[i][1] = 0;
      if (this.state.num > 1) {
        newMeal.splice(i,1);
        let num =this.state.num-1;
        this.setState({num: num});
      }
    }
    let newCost = Number(0);
      this.state.meal.forEach(el => {
        newCost += Number(el[1]);
      });
      this.setState({cost: newCost.toString()});
    this.setState({meal: newMeal});
  }
    

  // Handle add meal button 
  addMeal = () => {
    let num = this.state.num + 1;
    this.setState({num: num});
    let newMeal = this.state.meal;
    newMeal.push(["","0"]);
    this.setState({meal: newMeal});
  }

  // Check if any fields have been updated
  updated() {
    let valid = false;
    let updated = false;
    if (this.state.edit ||
        (this.state.startTime !== this.props.startTime) || 
        (this.state.endTime !== this.props.endTime) ||
        (this.state.location !== this.props.location)) {
      updated=true;
    }
    
    console.log(updated);
    for (let i=0; i<this.state.num; i++) {
      if (!(this.state.meal[i][0]==="Choose...")) {
        valid=true;
      }
    }
    if (this.state.endTime <= this.state.startTime) {
      valid=false;
    }
    if (this.state.location === "Choose...") { 
      valid=false;
    }
    console.log(valid);
    return (updated && valid);
  }

  // Delete database entry
  handleDelete(event) {
    let con = window.confirm("Are you sure you want to delete this entry?");
    if (con) {
      let apiName = 'Volunteer_LogsCRUD';
      let path = '/Volunteer_Logs/object/';
      path += this.state.name + "/" + this.state.date;
      API.del (apiName, path).then(response => {
        console.log(response);
        alert("Entry Deleted");
        this.props.history.push(this.props.backLink);
      }).catch(error => {
        console.log(error.response);
      })
  
    }
  }

  handleEdit() {
    if (this.state.edit) {
      this.props.history.push('/shiftHistory');
    }
    this.setState({edit: !this.state.edit});
  };

  // Update database entry
  handleSubmit(event) {
    let apiName = 'Volunteer_LogsCRUD';
    let path = '/Volunteer_Logs';

    if (this.updated()) {
      alert("Changes made");
      let init = {
        body: {
          name: this.state.name,
          date: this.state.date,
          startTime: this.state.startTime,
          endTime: this.state.endTime,
          location: this.state.location,
          meal: this.state.meal,
          cost: this.state.cost
        }
      };
      API.put(apiName, path, init).then(response => {
        console.log(response);
        alert("Entry Updated");
        this.props.history.push(this.props.backLink);
      }).catch(error => {
        console.log(error.response)
      });

    } else {
      if(this.state.edit) {     
        if (this.state.location === "Choose...") {
          alert("Please select a location from the dropdown menu.");
        } 
        else if (this.state.endTime <= this.state.startTime) {
          alert("Please select a valid start and end time.");
        }
        else {
          alert("Please select a meal from the dropdown menu.");
        }
      }
      else {
        alert("No changes made: Select edit to make changes.");
      }
    }
  }


  render = (props) => {
    let addButton = true;
    if (this.state.num >= 1) {
      let latestAddedMeal = this.state.meal[this.state.num - 1][0];
      if (latestAddedMeal !== "Choose..." && latestAddedMeal !== "None" && latestAddedMeal !== "") {
        addButton = false;
      
      }
    }

    return (
      <div>
        <Header title="Shift Details" link={() => this.props.history.push(this.props.backLink)}/>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 my-3">
              <Input value={this.state.name} title="User" 
                    update={(event) => this.setState({name: event.target.value})} 
                    disabled={true}/>
              <Input value={this.state.date} title="Date" type="date" 
                    update={(event) => this.setState({date: event.target.value})} 
                    disabled={true}/>
              {this.createLocationInputs()}
              <Input value={this.state.startTime} title="Start time" type="time" 
                    update={(event) => this.setState({startTime: event.target.value})}
                    disabled={(this.state.edit)? false : true}/>
              <Input value={this.state.endTime} title="End time" type="time" 
                    update={(event) => this.setState({endTime: event.target.value})}
                    disabled={(this.state.edit)? false : true}/>
              {/* <Input value={this.state.meal} title="Meal" disabled={true} /> */}
              {this.createMealInputs()}
              <div className="clearfix d-flex justify-content-start pb-3">
                <button type="button" className="btn btn-outline-success" aria-label="Close" onClick={this.addMeal} disabled={addButton} hidden={(this.state.edit)? false : true}>
                  Add Meal Item
                </button>
              </div>
              <Input value={`${this.state.cost}`} title="Cost ($)" type="number" disabled={true}/>
              <Button title={(this.state.edit)? "Cancel" : "Edit"} 
                      color="btn-primary rounded-0 btn-block" 
                      onClick={this.handleEdit}/>
              <Button title="Save" color="btn-secondary rounded-0 btn-block" onClick={this.handleSubmit} />
              <Button title="Delete" color="btn-danger rounded-0 btn-block" onClick={this.handleDelete} />
            </div>
          </div>
        </div>
      </div>
    );
  };
}

ShiftDetails.propTypes = {
  name: PropTypes.string,
  date: PropTypes.string,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  location: PropTypes.string.isRequired,
  edit: PropTypes.bool
};

export default withRouter(ShiftDetails);
