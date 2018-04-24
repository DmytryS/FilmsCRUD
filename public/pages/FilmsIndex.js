import React, { Component } from 'react';
import FilmsList from '../containers/FilmsListContainer.js';
import HeaderContainer from '../containers/HeaderContainer.js';

class FilmsIndex extends Component {
  render() {
    return (
      <div>
        <HeaderContainer type="films_index"/>
        <FilmsList />
      </div>
    );
  }
}


export default FilmsIndex;
