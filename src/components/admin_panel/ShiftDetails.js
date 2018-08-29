import React from 'react';
import { Header } from '../fsc/Header';
import { Input } from '../fsc/Input';
import PropTypes from "prop-types";

export const ShiftDetails = (props) => {
  return (
    <div>
      <Header title="Shift Details" link={() => props.history.push('/viewLogs')}/>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 my-3">
            <Input value={props.name} title="User" disabled={true}/>
            <Input value={props.date} title="Date" type="date" disabled={true}/>
            <Input value={props.startTime} title="Start time" type="time" disabled={true}/>
            <Input value={props.endTime} title="End time" type="time" disabled={true}/>
            <Input value={props.meal} title="Meal" disabled={true}/>
            <Input value={`${props.cost}`} title="Cost ($)" type="number" disabled={true}/>
          </div>
        </div>
      </div>
    </div>
  );
};

ShiftDetails.propTypes = {
  name: PropTypes.string,
  date: PropTypes.string,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  meal: PropTypes.string,
  cost: PropTypes.number
};

export default ShiftDetails;
