import React, { Component } from 'react';
import { connect } from 'react-redux';
import App from '../components/App.js';

const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: () =>{}
  }
};


export default connect(null, mapDispatchToProps)(App);
