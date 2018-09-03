import React from 'react';
import { Header } from '../fsc/Header';
import { Input } from '../fsc/Input';
import { Button } from '../fsc/Button';
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

export class ShiftDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      name: this.props.name,
      date: this.props.date,
      startTime: this.props.startTime,
      endTime: this.props.endTime,
      meal: this.props.meal,
      cost: this.props.cost,
      edit: false,
    };
    this.edit = this.edit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  edit(event) {
    this.setState({edit: !this.state.edit});
    alert(this.props.name + " " + this.props.date);
  }

  handleSubmit(event) {
    alert(this.state.name + " " + this.state.meal);
  }


  render = (props) => {
    return (
      <div>
        <Header title="Shift Details" link={() => this.props.history.push('/viewLogs')}/>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 my-3">
              <Input value={this.state.name} title="User" update={(event) => this.setState({name: event.target.value})} disabled={(this.state.edit)? "" : "disabled"}/>
              <Input value={this.state.date} title="Date" type="date" disabled={(this.state.edit)? "" : "disabled"}/>
              <Input value={this.state.startTime} title="Start time" type="time" disabled={(this.state.edit)? "" : "disabled"}/>
              <Input value={this.state.endTime} title="End time" type="time" disabled={(this.state.edit)? "" : "disabled"}/>
              <Input value={this.state.meal} title="Meal" disabled={(this.state.edit)? "" : "disabled"}/>
              <Input value={`${this.state.cost}`} title="Cost ($)" type="number" disabled={(this.state.edit)? "" : "disabled"}/>
              <Button title="Edit" color="btn-primary rounded-0 btn-block" onClick={this.edit}/>
              <Button title="Save" color="btn-secondary rounded-0 btn-block" onClick={this.handleSubmit} />
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
  meal: PropTypes.string,
  cost: PropTypes.number};

export default withRouter(ShiftDetails);
