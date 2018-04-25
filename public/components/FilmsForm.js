import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { Button, Alert } from 'react-bootstrap';
import renderField from './renderField';
import renderTextArea from './renderTextArea';
import renderSelect from './renderSelect'
import { addFilm, addFilmSuccess, addFilmFailure, resetAddFilm } from '../actions/films';
import ReactFileReader from 'react-file-reader';

function validate(values) {
  const errors = {};

  if (!values.title || values.title.trim() === '') {
    errors.title = 'Enter title';
  }
  if (!values.year || values.year.trim() === '') {
    errors.year = 'Enter year';
  }
  if (!values.format || values.format.trim() === '') {
    errors.format = 'Enter some content';
  }
  if (!values.stars || values.stars.trim() === '') {
    errors.stars = 'Enter stars';
  }

  return errors;
}


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

  handleFile (file)  {
    const { handleSubmit } = this.props;
    file = atob(file.base64.replace('data:text/plain;base64,', ''));

    let regexp = new RegExp(/(?:Title: (.*)\nRelease Year: (.*)\nFormat: (.*)\nStars: (.*))/g);
    let result;
    while (result = regexp.exec(file)) {
      const newFilm = {
        title: result[1],
        year: result[2],
        format: result[3],
        stars: result[4].split(',')
      };
      this.props.addFilm(newFilm);
    }
    this.context.router.push('/');
  }

  handleSubmitForm(newFilm) {
    newFilm.stars = newFilm.stars.split(',');
    this.props.addFilm(newFilm);
    this.context.router.push('/');
  }

  render() {
    const {handleSubmit, submitting, addFilm} = this.props;
    return (
      <div className='container'>
        { this.renderError(addFilm) }
        <ReactFileReader base64={true} fileTypes={[".txt"]}  handleFiles={this.handleFile.bind(this)} >
          <button className='btn'>Import from file</button>
        </ReactFileReader>
        Or
        <form onSubmit={ handleSubmit(this.handleSubmitForm.bind(this))}>
          <Field name="title" type="text" component={ renderField } label="Title*" />
          <Field name="year" type="text" component={ renderField } label="Year*" />
          <Field name="format" type="select" component={ renderSelect } options={['', 'VHS', 'DVD', 'Blu-Ray']} label="Format*"/>
          <Field name="stars" component={ renderTextArea } label="Stars*" />
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
  form: 'FilmsForm',
  validate
})(FilmsForm)
