import React from 'react';
import PropTypes from "prop-types";

let col3;
export const Table = (props) => {
  col3 = props.col3;
  if (!col3) {
    return(
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">{props.col1}</th>
            <th scope="col">{props.col2}</th>
          </tr>
        </thead>
        <tbody>
          {renderRows(props.data, props.select)}
        </tbody>
      </table>
    );
  }
  return(
    <table className="table table-bordered table-hover">
      <thead>
        <tr>
          <th scope="col">{props.col1}</th>
          <th scope="col">{props.col2}</th>
          <th scope="col">{props.col3}</th>
        </tr>
      </thead>
      <tbody>
        {renderRows(props.data, props.select)}
      </tbody>
    </table>
  );
};

const renderRows = (data, select) => {
  let rows = new Array(Object.keys(data).length);
  if (!col3) {
    for (let i = 0; i < data.length; i++) {
      rows.push(
        <tr key={i} onClick={() => {if (select) { select(i) }}}>
          <td>{data[i].col1}</td>
          <td>{data[i].col2}</td>
        </tr>
      );
    }
  } else {
      for (let i = 0; i < data.length; i++) {
      rows.push(
        <tr key={i} onClick={() => {if (select) { select(i) }}}>
          <td>{data[i].col1}</td>
          <td>{data[i].col2}</td>
          <td>{data[i].col3}</td>
        </tr>
      );
    }
  }
  return rows;
};


Table.propTypes = {
  col1: PropTypes.string.isRequired,
  col2: PropTypes.string.isRequired,
  col3: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Table;
