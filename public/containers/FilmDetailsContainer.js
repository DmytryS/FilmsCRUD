import FilmDetails from '../components/FilmDetails';
import { fetchFilm, fetchFilmSuccess, fetchFilmFailure, resetActiveFilm, resetDeletedFilm } from '../actions/films';
import { connect } from 'react-redux';



function mapStateToProps(globalState, ownProps) {
  return {
    activeFilm: globalState.films.activeFilm,
    filmId: ownProps.id
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFilm: (id) => {
      dispatch(fetchFilm(id))
        .then((result) => {
          if (result.payload.response && result.payload.response.status !== 200) {
            dispatch(fetchFilmFailure(result.payload.response.data));
          } else {
            dispatch(fetchFilmSuccess(result.payload.data))
          }
        })
    },
    resetMe: () => {
      dispatch(resetActiveFilm());
      dispatch(resetDeletedFilm());
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(FilmDetails);
