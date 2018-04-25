import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFilms, resetDeletedFilm, deleteFilm, deleteFilmSuccess, deleteFilmFailure } from '../actions/films';
import Header from '../components/header';



function mapStateToProps(state) {
  return {
    deletedFilm: state.films.deletedFilm,
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onDeleteClick: () => {
      dispatch(deleteFilm(ownProps.filmId))
        .then((response) => {
          if(!response.error) {
            dispatch(deleteFilmSuccess(response.payload));
          } else {
            dispatch(deleteFilmFailure(response.payload));
          }
        });
    },
    resetMe: () =>{
      dispatch(resetDeletedFilm());
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);
