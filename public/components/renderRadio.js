import React, { Component } from 'react';
import { Radio } from 'react-bootstrap';

const renderRadios = (radios, id) => {
  return radios.map((option,index) => {
    if (index === 0) {
      return <Radio checked name={id}>{option}</Radio>
    } else {
      return <Radio name={id}>{option}</Radio>
    }
  })
};

const renderRadio = ({ input, label, type, meta: { touched, error, invalid, warning }, radios, id }) => (
  <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
      {renderRadios(radios, id)}
  </div>
);

export default renderRadio;

