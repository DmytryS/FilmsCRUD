import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router';

class FilmDetails extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetMe();
  }

  componentDidMount() {
    this.props.fetchFilm(this.props.filmId);
  }

  render() {
    const { film, loading, error } = this.props.activeFilm;
    if (loading) {
      return <div className="container">Loading...</div>;
    } else if(error) {
    return  <div className="alert alert-danger">{error.message}</div>
    } else if(!film) {
      return <span />
    }

    return (
      <div className="container">
        <h3>{film.name}</h3>
        <h5>Year: {film.year}</h5>
        <h5>Format: {film.format}</h5>
        <h5>Actors: {film.actors.join(' ')}</h5>
      </div>
    );
  }
}

export default FilmDetails;
