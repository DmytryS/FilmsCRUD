import FilmsForm from '../components/FilmsForm';
import { resetAddFilm } from '../actions/films';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: () => {
      dispatch(resetAddFilm());
    }
  }
};

function mapStateToProps(state, ownProps) {
  return {
    addFilm: state.films.addFilm
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FilmsForm);

