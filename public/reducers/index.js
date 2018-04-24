import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import FilmsReducer from './FilmReducer';

const Reducers = combineReducers({
  films: FilmsReducer,
  form: formReducer // <-- redux-form
});

export default Reducers;
