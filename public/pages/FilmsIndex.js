import React, { Component } from 'react';
import FilmsList from '../containers/FilmsListContainer.js';
import HeaderContainer from '../containers/HeaderContainer.js';
import Filter from '../containers/FilterContainer'

class FilmsIndex extends Component {
  render() {
    return (
      <div>
        <HeaderContainer type="films_index"/>
        <Filter />
        <FilmsList />
      </div>
    );
  }
}


export default FilmsIndex;
