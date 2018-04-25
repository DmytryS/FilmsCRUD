import FilterForm from '../components/filter';
import {fetchFilms, fetchFilmsFailure, fetchFilmsSuccess} from '../actions/films';
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
  return {
    filmsList: state.films.filmsList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFilms: (queryParams) => {
      dispatch(fetchFilms(queryParams)).then((response) => {
        !response.error ? dispatch(fetchFilmsSuccess(response.payload.data)) : dispatch(fetchFilmsFailure(response.payload.data));
      });
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterForm);

