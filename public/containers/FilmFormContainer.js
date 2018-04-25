import FilmsForm from '../components/FilmsForm';
import {addFilmFailure, addFilmSuccess, resetAddFilm, addFilm} from '../actions/films';
import { connect } from 'react-redux';
import {SubmissionError} from "redux-form";


const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: () => {
      dispatch(resetAddFilm());
    },
    addFilm: (filmObject) => {
      dispatch(addFilm(filmObject))
        .then(result => {
          if (result.payload.response && result.payload.response.status !== 200) {
            dispatch(addFilmFailure(result.payload.response.data));
            throw new SubmissionError(result.payload.response.data);
          }
          dispatch(addFilmSuccess(result.payload.data));
        })
    }
  }
};

function mapStateToProps(state, ownProps) {
  return {
    addFilm: state.films.addFilm
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FilmsForm);

