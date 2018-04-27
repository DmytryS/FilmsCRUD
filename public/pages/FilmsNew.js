import React, { Component } from 'react';
import FilmFormContainer from '../containers/FilmFormContainer';
import HeaderContainer from '../containers/HeaderContainer.js';

class PostsNew extends Component {
  render() {
    return (
      <div>
        <HeaderContainer type="films_add"/>
        <FilmFormContainer />
      </div>
    );
  }
}


export default PostsNew;
