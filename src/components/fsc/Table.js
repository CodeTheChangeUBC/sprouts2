import React from 'react';
import PropTypes from "prop-types";

export const Table = (props) => {
  return(
    <table className="">
      <thead>
        <tr scope="col">{props.col1}</tr>
        <tr scope="col">{props.col2}</tr>
        <tr scope="col">{props.col3}</tr>
      </thead>
      <tbody>
        {renderRows(props.data)}
      </tbody>
    </table>
  );
};

const renderRows = (data) => {
  let rows = new Array(Object.keys(data).length);
  for (let i = 0; i < rows.length; i++) {
    rows.push(
      <tr>
        <td>{data[i].col1}</td>
        <td>{data[i].col2}</td>
        <td>{data[i].col3}</td>
      </tr>
    );
  }
  return rows;
};

Table.propTypes = {
  col1: PropTypes.string.isRequired,
  col2: PropTypes.string.isRequired,
  col3: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Table;
