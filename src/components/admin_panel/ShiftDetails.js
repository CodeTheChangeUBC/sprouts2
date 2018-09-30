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
      mealUpdate: this.getDefaultState(),
      numMeals: 0,
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
  }

  getDefaultState() {
    return [["", "0"]];
  }

  // Render Add Meal dropdown
  createMealInputs = () =>  {
    let output = [];
    output.push();
    for(let i=0; i<this.state.numMeals; i++) {
      output.push(
        <Select
          key={i+1}
          renderTitle={false}
          value = {this.state.mealUpdate[i][0]}
          title = "Meal"
          update = { (event) => this.setMealAndCost(event, i)}
          dropdown = {Object.keys(this.state.mealOptions)}
        />
      );
    }
    return output;
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
    let newMeal = this.state.mealUpdate;
    newMeal[i][0] = event.target.value;
    if (this.state.mealOptions[event.target.value]) {
      newMeal[i][1] = this.state.mealOptions[event.target.value];
      let newCost = this.props.cost;
      this.state.mealUpdate.forEach(el => {
        newCost += Number(el[1]);
      });
      this.setState({cost: newCost.toString()});
    }
    this.setState({mealUpdate: newMeal});
  }

  // Handle add meal button 
  addMeal = () => {
    let numMeals = this.state.numMeals + 1;
    this.setState({numMeals: numMeals});
    let newMeal = this.state.mealUpdate;
    newMeal.push(["","0"]);
    this.setState({mealUpdate: newMeal});
  }

  // Check if any field have been updated
  updated() {
    if (this.state.mealUpdate[0][0].length !== 0 &&
      this.state.mealUpdate[0][0]!=="None") {
      return true;  
    }
    if ((this.state.startTime !== this.props.startTime) || 
        (this.state.endTime !== this.props.endTime) ||
        (this.state.location !== this.props.location)) {
        return true;
    } 
    return false;
  }

  // Delete database entry
  handleDelete(event) {
    let con = window.confirm("Are you sure you want to delete this entry?");
    alert(con);
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
  // Update database entry
  handleSubmit(event) {
    let apiName = 'Volunteer_LogsCRUD';
    let path = '/Volunteer_Logs';
    let mealList=this.state.meal;

    if (this.updated()) {
      alert("Changes made");
      for (let i=0; i<this.state.numMeals; i++) {
        mealList += this.state.mealUpdate[i][0] + ";";
      }

      let init = {
        body: {
          name: this.state.name,
          date: this.state.date,
          startTime: this.state.startTime,
          endTime: this.state.endTime,
          location: this.state.location,
          meal: mealList,
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
      alert("No changes made");
    }
  }


  render = (props) => {

    return (
      <div>
        <Header title="Shift Details" link={() => this.props.history.push(this.props.backLink)}/>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 my-3">
              <Input value={this.state.name} title="User" 
                    update={(event) => this.setState({name: event.target.value})} 
                    disabled={"disabled"}/>
              <Input value={this.state.date} title="Date" type="date" 
                    update={(event) => this.setState({date: event.target.value})} 
                    disabled={"disabled"}/>
              {this.createLocationInputs()}
              <Input value={this.state.startTime} title="Start time" type="time" 
                    update={(event) => this.setState({startTime: event.target.value})}
                    disabled={(this.state.edit)? "" : "disabled"}/>
              <Input value={this.state.endTime} title="End time" type="time" 
                    update={(event) => this.setState({endTime: event.target.value})}
                    disabled={(this.state.edit)? "" : "disabled"}/>
                            <Input value={this.state.meal} title="Meal" disabled={true}/>
              {this.createMealInputs()}
              <div className="d-block clearfix">
                <button type="button" className="close btn btn-link" aria-label="Close" onClick={this.addMeal} hidden={(this.state.edit)? false : true}>
                  <span aria-hidden="true" className="text-success">&#43;</span>
                </button>
              </div>
              <Input value={`${this.state.cost}`} title="Cost ($)" type="number" disabled={true}/>
              <Button title={(this.state.edit)? "Cancel" : "Edit"} 
                      color="btn-primary rounded-0 btn-block" 
                      onClick={(event) => this.setState({edit: !this.state.edit})}/>
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
