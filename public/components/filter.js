import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { Button, FormGroup, FormControl, ControlLabel, Radio} from 'react-bootstrap';
import renderField from './renderField';
import renderRadio from './renderRadio';
import renderSelect from './renderSelect'

class FilterForm extends Component {


  filterFilms(values, dispatch) {
    if(!values['sort-by']) {
      values['sort-by'] = 'stars'
    }
    if(!values['sort-order']) {
      values['sort-order'] = 'asc'
    }

    if(values.searchText) {
      values[values['sort-by']] = values.searchText;
    }
    delete values.searchText;
    debugger;
    this.props.fetchFilms(values);
  }

  render() {
    const {handleSubmit, submitting} = this.props;
    return (
      <div className='container'>
        <form onSubmit={ handleSubmit(this.filterFilms.bind(this))}>
          <FormGroup>
            <Field name="searchText" type="text" component={ renderField } label="Search:"/>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Find by</ControlLabel>
            <Field name="sort-by" type="select" component={ renderSelect } options={['stars','title']}/>

          </FormGroup>
          <FormGroup>
            <Field checked name="sort-order" component="input" type="radio" value="asc"/>asc
            <br/>
            <Field name="sort-order" component="input" type="radio" value="desc"/>desc
          </FormGroup>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    )
  }
}


export default reduxForm({
  form: 'FilterForm'
})(FilterForm)
