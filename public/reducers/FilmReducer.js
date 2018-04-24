import {
  FETCH_FILMS, FETCH_FILMS_SUCCESS, FETCH_FILMS_FAILURE, RESET_FILMS,
  FETCH_FILM, FETCH_FILM_SUCCESS,  FETCH_FILM_FAILURE, RESET_ACTIVE_FILM,
  ADD_FILM, ADD_FILM_SUCCESS, ADD_FILM_FAILURE, RESET_ADD_FILM,
  DELETE_FILM, DELETE_FILM_SUCCESS, DELETE_FILM_FAILURE, RESET_DELETED_FILM,
  VALIDATE_FILM_FIELDS,VALIDATE_FILM_FIELDS_SUCCESS, VALIDATE_FILM_FIELDS_FAILURE, RESET_FILM_FIELDS
} from '../actions/films';


const INITIAL_STATE = { filmsList: {films: [], error:null, loading: false},
  addFilm:{film:null, error: null, loading: false},
  activeFilm:{film:null, error:null, loading: false},
  deletedFilm: {film: null, error:null, loading: false},
};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

    case FETCH_FILMS:// start fetching films and set loading = true
      return { ...state, filmsList: {films:[], error: null, loading: true} };
    case FETCH_FILMS_SUCCESS:// return list of films and make loading = false
      return { ...state, filmsList: {films: action.payload, error:null, loading: false} };
    case FETCH_FILMS_FAILURE:// return error and make loading = false
      error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
      return { ...state, filmsList: {films: [], error: error, loading: false} };
    case RESET_FILMS:// reset postList to initial state
      return { ...state, filmsList: {films: [], error:null, loading: false} };

    case FETCH_FILM:
      return { ...state, activeFilm:{...state.activeFilm, loading: true}};
    case FETCH_FILM_SUCCESS:
      return { ...state, activeFilm: {film: action.payload, error:null, loading: false}};
    case FETCH_FILM_FAILURE:
      error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
      return { ...state, activeFilm: {film: null, error:error, loading:false}};
    case RESET_ACTIVE_FILM:
      return { ...state, activeFilm: {film: null, error:null, loading: false}};

    case ADD_FILM:
      return {...state, addFilm: {...state.addFilm, loading: true}};
    case ADD_FILM_SUCCESS:
      return {...state, addFilm: {film:action.payload, error:null, loading: false}};
    case ADD_FILM_FAILURE:
      error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
      return {...state, addFilm: {film:null, error:error, loading: false}};
    case RESET_ADD_FILM:
      return {...state,  addFilm:{film:null, error:null, loading: false}};


    case DELETE_FILM:
      return {...state, deletedFilm: {...state.deletedFilm, loading: true}};
    case DELETE_FILM_SUCCESS:
      return {...state, deletedFilm: {film:action.payload, error:null, loading: false}};
    case DELETE_FILM_FAILURE:
      error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
      return {...state, deletedFilm: {film:null, error:error, loading: false}};
    case RESET_DELETED_FILM:
      return {...state,  deletedFilm:{film:null, error:null, loading: false}};

    case VALIDATE_FILM_FIELDS:
      return {...state, addFilm:{...state.addFilm, error: null, loading: true}};
    case VALIDATE_FILM_FIELDS_SUCCESS:
      return {...state, addFilm:{...state.addFilm, error: null, loading: false}};
    case VALIDATE_FILM_FIELDS_FAILURE:
      let result = action.payload;
      if(!result) {
        error = {message: action.payload.message};
      } else {
        error = {title: result.title, categories: result.categories, description: result.description};
      }
      return {...state, addFilm:{...state.addFilm, error: error, loading: false}};
    case RESET_FILM_FIELDS:
      return {...state, addFilm:{...state.addFilm, error: null, loading: null}};
    default:
      return state;
  }
}
