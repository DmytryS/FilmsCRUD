import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router';
import { Alert } from 'react-bootstrap';

class FilmDetails extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUnmount() {
    this.props.resetMe();
  }

  componentDidMount() {
    this.props.fetchFilm(this.props.filmId);
  }

  render() {
    const { film, loading, error } = this.props.activeFilm;
    if (loading) {
      return <div>Loading...</div>;
    } else if(error) {
    return   <Alert bsStyle="danger"><h4>Error!</h4><p>{error.message}</p></Alert>
    } else if(!film) {
      return <span />
    }

    return (
      <div>
        <h3>{film.title}</h3>
        <h5>Year: {film.year}</h5>
        <h5>Format: {film.format}</h5>
        <h5>Stars: {film.stars.join(' ')}</h5>
      </div>
    );
  }
}

export default FilmDetails;
