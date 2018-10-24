import React from 'react';
import { API } from 'aws-amplify';
import { Header } from '../fsc/Header';
import { Button } from '../fsc/Button';
import { Input } from '../fsc/Input';
import { Select } from '../fsc/Select';
import { Auth } from 'aws-amplify';

export class LogHours extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.removeMeal = this.removeMeal.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  componentDidMount() {
    Auth.currentSession()
      .then((session) => {
        this.setState({name: session.accessToken.payload.username});
      })
      .catch(err => console.log(err));
  }

  getDefaultState() {
    let d = new Date();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let hour = d.getHours();
    let minute = d.getMinutes();
    let endHour = hour;
    let endMinute = minute+15;
    let date = d.getFullYear() + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
    let startTime = (hour < 10 ? '0' : '') + hour + ':' + (minute < 10 ? '0' : '') + minute;
    if (minute>=45) {
      endHour+=1;
      endMinute=endMinute - 60;
    }
    let endTime = (endHour < 10 ? '0' : '') + endHour + ':' + (endMinute < 10 ? '0' : '') + endMinute;
    this.getMealData();

    return {
      name: "",
      date: date,
      startTime: startTime,
      endTime: endTime,
      location: "",
      meal: [["", "0"]],
      cost: "0",
      numMeals: 1,
      mealOptions: {},
      errorMsg: ""
    };
  }

  isValid() {
    if (!this.state.date) {
      alert("Please select a valid date.");
      return false;
    }
    if (!(this.state.startTime && this.state.endTime &&
      (this.state.endTime > this.state.startTime))) {
        alert("Please select a valid start and end time.");
        return false;
    }
    if (!this.state.location || this.state.location === "Choose...") {
      alert("Please select a location from the dropdown menu.");
      return false;
    }
    console.log(this.state.meal);
    if (!(this.state.meal[0][0]) || (this.state.meal[0][0] ==="Choose...")) {
      alert("Please select a meal option from the dropdown menu");
      return false;
    }
    else {return true;}
  }
  handleSubmit() {
    let apiName = 'Volunteer_LogsCRUD';
    let path = '/Volunteer_Logs';
    let init = {
      body: {
        name: this.state.name,
        date: this.state.date,
        startTime: this.state.startTime,
        endTime: this.state.endTime,
        location: this.state.location,
        meal: this.state.meal,
        cost: Number(this.state.cost)
      }
    };
    if (this.isValid()) {
    API.post(apiName, path, init).then(response => {
      alert("Shift logged successfully!");
      this.props.history.push('/')
        }).catch(error => {
      this.setState({
        errorMsg: "Something went wrong, please try again."
      });
    });
  }
  }

  getMealData() {
    let apiName = 'Meal_OptionsCRUD';
    let path = '/Meal_Options';
    API.get(apiName, path).then(response => {
      this.setState({apiData: response.data.reverse()});
      this.parseMealData();
    }).catch(error => {
      console.log("Err " + error);
    });
  }

  parseMealData() {
    let mealOptions = {};
    let apiData = this.state.apiData;
    apiData.forEach(el => {
        let name = el.Name;
        let price = el.Price;
        mealOptions[name] = price;
      }
    );
    this.setState({mealOptions: mealOptions});
  }


  addMeal = () => {
    let numMeals = this.state.numMeals + 1;
    this.setState({numMeals: numMeals});
    let newMeal = this.state.meal;
    newMeal.push(["","0"]);
    this.setState({meal: newMeal});
  }

  // Remove a meal input
  removeMeal (meal) {
    let newMeal = this.state.meal;
    let x = newMeal.indexOf(meal);
    console.log("x is " + x);
    if (x >= 0 && this.state.numMeals>1) {
      console.log("x is " + x);

      newMeal.splice(x,1);
      this.setState({meal: newMeal});
  
      let num =this.state.numMeals-1;
      this.setState({numMeals: num});
  
      let newCost = this.state.cost -meal[1];
      this.setState({cost: newCost});
    }
  }

  //TODO - Please style the remove button
  createMealInputs = () =>  {
    let output = [];
    output.push(<label key={0}>Meal</label>);
    for(let i=0; i<this.state.numMeals; i++) {
      output.push(
        <div key={i+1} className="row">
          <div className={(this.state.numMeals>1)? "col-8 col-sm-9 col-md-10" : "col-12"}>
            <Select
              renderTitle={false}
              value = {this.state.meal[i][0]}
              title = "Meal"
              update = { (event) => this.setMealAndCost(event, i)}
              dropdown = {Object.keys(this.state.mealOptions)}/>
          </div>
          {(this.state.numMeals>1)? (
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

  setMealAndCost(event, i) {
    let newMeal = this.state.meal;
    newMeal[i][0] = event.target.value;
    if (this.state.mealOptions[event.target.value]) {
      newMeal[i][1] = this.state.mealOptions[event.target.value];
    } 
    else  {
      newMeal[i][1] = 0;
      console.log(newMeal[i][0]);
      if (this.state.numMeals > 1) {
        newMeal.splice(i,1);
        let num =this.state.numMeals-1;
        this.setState({numMeals: num});
      }
    }
    let newCost = 0;
      this.state.meal.forEach(el => {
        newCost += Number(el[1]);
      });
      this.setState({cost: newCost.toString()});
    this.setState({meal: newMeal});
  }

  render() {
    let disabled = false;
    let addButton = true;
    

    let latestAddedMeal = this.state.meal[this.state.numMeals - 1][0];
    // if (this.state.date && this.state.startTime && this.state.endTime &&
    //     this.state.location !== "Choose..." && this.state.location &&
    //     latestAddedMeal !== "Choose..." && latestAddedMeal && this.state.cost &&
    //     (this.state.endTime > this.state.startTime)) {
    //   disabled = false;
    // }
    if (latestAddedMeal !== "Choose..." && latestAddedMeal !== "None" && latestAddedMeal !== "") {
      addButton = false;
    }

    return (
      <div>
        <Header title="Log Hours" link={() => this.props.history.push('/')}/>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 my-3">
              <Input value={this.state.date} title="Date" type="date" update={(event) => this.setState({date: event.target.value})}/>
              <Input value={this.state.startTime} title="Start time" type="time" update={(event) => this.setState({startTime: event.target.value})}/>
              <Input value={this.state.endTime} title="End time" type="time" update={(event) => this.setState({endTime: event.target.value})}/>
              <Select value={this.state.location} title="Location" update={(event) => this.setState({location: event.target.value})} dropdown={["Sprouts Cafe", "Option 2", "Option 3"]} />
              {this.createMealInputs()}
              <div className="clearfix d-flex justify-content-start pb-3">
                <button type="button" className="btn btn-outline-success" aria-label="Close" onClick={this.addMeal} disabled={addButton}>
                  Add Meal Item
                </button>
              </div>
              <Input value={this.state.cost} title="Cost ($)" disabled={true} />
              <p>(Every field is required)</p>
              <p className={this.state.errorMsg === "Something went wrong, please try again." ? "text-danger" : "text-success"}>{this.state.errorMsg}</p>
              <Button title="Submit" color="btn-primary rounded-0 btn-block" onClick={this.handleSubmit.bind(this)} disabled={disabled} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
