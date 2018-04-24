import axios from 'axios';

//Post list
export const FETCH_FILMS = 'FETCH_FILMS';
export const FETCH_FILMS_SUCCESS = 'FETCH_FILMS_SUCCESS';
export const FETCH_FILMS_FAILURE = 'FETCH_FILMS_FAILURE';
export const RESET_FILMS = 'RESET_FILMS';

//Create new film
export const ADD_FILM = 'ADD_FILM';
export const ADD_FILM_SUCCESS = 'ADD_FILM_SUCCESS';
export const ADD_FILM_FAILURE = 'ADD_FILM_FAILURE';
export const RESET_ADD_FILM = 'RESET_ADD_FILM';

//Validate film fields like Title, Categries on the server
export const VALIDATE_FILM_FIELDS = 'VALIDATE_FILM_FIELDS';
export const VALIDATE_FILM_FIELDS_SUCCESS = 'VALIDATE_FILM_FIELDS_SUCCESS';
export const VALIDATE_FILM_FIELDS_FAILURE = 'VALIDATE_FILM_FIELDS_FAILURE';
export const RESET_FILM_FIELDS = 'RESET_FILM_FIELDS';

//Fetch film
export const FETCH_FILM = 'FETCH_FILM';
export const FETCH_FILM_SUCCESS = 'FETCH_FILM_SUCCESS';
export const FETCH_FILM_FAILURE = 'FETCH_FILM_FAILURE';
export const RESET_ACTIVE_FILM = 'RESET_ACTIVE_FILM';

//Delete film
export const DELETE_FILM = 'DELETE_FILM';
export const DELETE_FILM_SUCCESS = 'DELETE_FILM_SUCCESS';
export const DELETE_FILM_FAILURE = 'DELETE_FILM_FAILURE';
export const RESET_DELETED_FILM = 'RESET_DELETED_FILM';



const ROOT_URL = '/api';
export function fetchFilms() {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/films?limit=50`,
    headers: []
  });

  return {
    type: FETCH_FILMS,
    payload: request
  };
}

export function fetchFilmsSuccess(films) {
  return {
    type: FETCH_FILMS_SUCCESS,
    payload: films
  };
}

export function fetchFilmsFailure(error) {
  return {
    type: FETCH_FILMS_FAILURE,
    payload: error
  };
}

export function resetFilmFields() {
  return {
    type: RESET_FILM_FIELDS
  }
}

export function addFilm(props) {
  const request = axios({
    method: 'put',
    data: props,
    url: `${ROOT_URL}/films`
  });

  return {
    type: ADD_FILM,
    payload: request
  };
}

export function addFilmSuccess(newFilm) {
  return {
    type: ADD_FILM_SUCCESS,
    payload: newFilm
  };
}

export function addFilmFailure(error) {
  return {
    type: ADD_FILM_FAILURE,
    payload: error
  };
}

export function resetAddFilm() {
  return {
    type: RESET_ADD_FILM
  }
}

export function resetDeletedFilm() {
  return {
    type: RESET_DELETED_FILM
  }
}

export function fetchFilm(filmId) {
  const request = axios.get(`${ROOT_URL}/films/${filmId}`);

  return {
    type: FETCH_FILM,
    payload: request
  };
}


export function fetchFilmSuccess(activeFilm) {
  return {
    type: FETCH_FILM_SUCCESS,
    payload: activeFilm
  };
}

export function fetchFilmFailure(error) {
  return {
    type: FETCH_FILM_FAILURE,
    payload: error
  };
}

export function resetActiveFilm() {
  return {
    type: RESET_ACTIVE_FILM
  }
}


export function deleteFilm(filmId) {
  const request = axios({
    method: 'delete',
    url: `${ROOT_URL}/films/${filmId}`
  });
  return {
    type: DELETE_FILM,
    payload: request
  };
}

export function deleteFilmSuccess(deletedFilm) {
  return {
    type: DELETE_FILM_SUCCESS,
    payload: deletedFilm
  };
}

export function deleteFilmFailure(response) {
  return {
    type: DELETE_FILM_FAILURE,
    payload: response
  };
}