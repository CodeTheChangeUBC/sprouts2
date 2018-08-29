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
      meal: "",
      cost: ""
    };
  }

  handleSubmit() {
    let apiName = 'Volunteer_LogsCRUD';
    let path = '/Volunteer_Logs';
    console.log(this.state);
    let init = {
      body: this.state
    };
    API.post(apiName, path, init).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error.response)
    });
  }

  render() {
    let disabled = true;
    if (this.state.date && this.state.startTime && this.state.endTime &&
        this.state.location !== "Choose..." && this.state.location && 
        this.state.meal !== "Choose..." && this.state.meal && this.state.cost) {
      disabled = false;
    }
    return (
      <div>
        <Header title="Log Hours" link={() => this.props.history.push('/')}/>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 my-3">
              <Input value={this.state.date} title="Date" type="date" disabled={true} update={(event) => this.setState({date: event.target.value})}/>
              <Input value={this.state.startTime} title="Start time" type="time" update={(event) => this.setState({startTime: event.target.value})}/>
              <Input value={this.state.endTime} title="End time" type="time" update={(event) => this.setState({endTime: event.target.value})}/>
              <Select value={this.state.location} title="Location" update={(event) => this.setState({location: event.target.value})} dropdown={["Sprouts Cafe", "Option 2", "Option 3"]} />
              <Select value={this.state.meal} title="Meal" update={(event) => this.setState({meal: event.target.value})} dropdown={["Sandwich", "Coffee", "Cookie", "None"]} />
              <Input value={this.state.cost} title="Cost ($)" type="number" update={(event) => this.setState({cost: event.target.value})} />
              <p>(Every field is required)</p>
              <Button title="Submit" color="btn-primary rounded-0 btn-block" onClick={this.handleSubmit.bind(this)} disabled={disabled} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
