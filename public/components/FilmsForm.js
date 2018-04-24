import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { FormGroup, ControlLabel, FormControl, Button, Alert } from 'react-bootstrap';
import renderField from './renderField';
import renderTextArea from './renderTextArea';
import renderSelect from './renderSelect'
import { addFilm, addFilmSuccess, addFilmFailure, resetAddFilm } from '../actions/films';

//Client side validation
function validate(values) {
  const errors = {};

  if (!values.name || values.name.trim() === '') {
    errors.title = 'Enter a Name';
  }
  if (!values.year || values.year.trim() === '') {
    errors.year = 'Enter year';
  }
  if (!values.format || values.format.trim() === '') {
    errors.format = 'Enter some content';
  }
  if (!values.actors || values.actors.trim() === '') {
    errors.actors = 'Enter actors';
  }

  return errors;
}

const validateAndAddFilm = (values, dispatch) => {
  values.actors = values.actors.split(',');
  return dispatch(addFilm(values))
    .then(result => {
      if (result.payload.response && result.payload.response.status !== 200) {
        dispatch(addFilmFailure(result.payload.response.data));
        throw new SubmissionError(result.payload.response.data);
      }
      dispatch(addFilmSuccess(result.payload.data));
      debugger;
      this.context.router.push('/');
    });
};



class FilmsForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.addFilm.post && !nextProps.addFilm.error) {
      this.context.router.push('/');
    }
  }

  renderError(addFilm) {
    if (addFilm && addFilm.error && addFilm.error.message) {
      return (
        <Alert bsStyle="danger">
          <h4>Error!</h4>
          <p>{ addFilm ? addFilm.error.message : '' }</p>
        </Alert>
      );
    } else {
      return <span></span>
    }
  }
  render() {
    const {handleSubmit, submitting, addFilm} = this.props;
    return (
      <div className='container'>
        { this.renderError(addFilm) }

        <form onSubmit={ handleSubmit(validateAndAddFilm.bind(this))}>
          <Field name="name" type="text" component={ renderField } label="Name*" />
          <Field name="year" type="text" component={ renderField } label="Year*" />

          <Field name="format" type="select" component={ renderSelect } options={['', 'VHS', 'DVD', 'Blu-Ray']} label="Format*"/>


          <Field name="actors" component={ renderTextArea } label="Actors*" />

          <Button type="submit" className="btn btn-primary" disabled={ submitting }>
            Submit
          </Button>
          <Button>
            <Link to="/" className="btn btn-error">
              Cancel
            </Link>
          </Button>
        </form>
      </div>
    )
  }
}


export default reduxForm({
  form: 'FilmsForm', // a unique identifier for this form
  validate // <--- validation function given to redux-form
})(FilmsForm)
