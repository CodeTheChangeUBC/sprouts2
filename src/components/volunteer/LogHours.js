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
    let date = d.getFullYear() + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
    let startTime = (hour < 10 ? '0' : '') + hour + ':' + (minute < 10 ? '0' : '') + minute;
    let endTime = (hour < 10 ? '0' : '') + hour + ':' + (minute < 10 ? '0' : '') + minute;

    return {
      name: "",
      date: date,
      startTime: startTime,
      endTime: endTime,
      location: "",
      meal: [["", "0"]],
      cost: "0",
      numMeals: 1,
      mealOptions: {
        Sandwich: "7",
        Coffee: "3",
        Cookie: "1",
        None: "0"
      },
      errorMsg: ""
    };
  }

  handleSubmit() {
    let apiName = 'Volunteer_LogsCRUD';
    let path = '/Volunteer_Logs';
    let mealList = "";
    for (let i=0; i<this.state.numMeals; i++) {
      mealList += this.state.meal[i][0] + "; ";
    }
    let init = {
      body: {
        name: this.state.name,
        date: this.state.date,
        startTime: this.state.startTime,
        endTime: this.state.endTime,
        location: this.state.location,
        meal: mealList,
        cost: Number(this.state.cost)
      }
    };
    API.post(apiName, path, init).then(response => {
      // this.setState({
      //   errorMsg: "Add successful!"
      // });
      alert("Shift logged successfully!");
      this.props.history.push('/')
        }).catch(error => {
      this.setState({
        errorMsg: "Something went wrong, please try again."
      });
    });
  }

  addMeal = () => {
    let numMeals = this.state.numMeals + 1;
    this.setState({numMeals: numMeals});
    let newMeal = this.state.meal;
    newMeal.push(["","0"]);
    this.setState({meal: newMeal});
  }

  createMealInputs = () =>  {
    let output = [];
    output.push(<label key={0}>Meal</label>);
    for(let i=0; i<this.state.numMeals; i++) {
      output.push(
        <Select
          key={i+1}
          renderTitle={false}
          value = {this.state.meal[i][0]}
          title = "Meal"
          update = { (event) => this.setMealAndCost(event, i)}
          dropdown = {Object.keys(this.state.mealOptions)}
        />
      );
    }
    return output;
  }

  setMealAndCost(event, i) {
    let newMeal = this.state.meal;
    newMeal[i][0] = event.target.value;
    if (this.state.mealOptions[event.target.value]) {
      newMeal[i][1] = this.state.mealOptions[event.target.value];
      let newCost = 0;
      this.state.meal.forEach(el => {
        newCost += Number(el[1]);
      });
      this.setState({cost: newCost.toString()});
    }
    this.setState({meal: newMeal});
  }

  render() {
    let disabled = true;
    let latestAddedMeal = this.state.meal[this.state.numMeals - 1][0];
    if (this.state.date && this.state.startTime && this.state.endTime &&
        this.state.location !== "Choose..." && this.state.location &&
        latestAddedMeal !== "Choose..." && latestAddedMeal && this.state.cost) {
      disabled = false;
    }

    let addButton = true;
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
              <div className="d-block clearfix">
                <button type="button" className="close btn btn-link" aria-label="Close" onClick={this.addMeal} disabled={addButton}>
                  <span aria-hidden="true" className="text-success">&#43;</span>
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
