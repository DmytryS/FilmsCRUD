import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FilmDetailsContainer from '../containers/FilmDetailsContainer';
import HeaderContainer from '../containers/HeaderContainer.js';

class FilmsShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onDeleteClick() {
    this.props.deleteFilm(this.props.params.id)
      .then(() => { this.context.router.push('/'); });
  }

  render() {
    return (
      <div className='container'>
        <HeaderContainer type="films_show" filmId={this.props.params.id}/>
        <FilmDetailsContainer id={this.props.params.id}/>
      </div>
    );
  }
}

export default FilmsShow;
