import * as R from 'ramda';
import { connect } from 'react-redux';
import { fetchFilmsForPerson, back } from '../Actions';
import Person from '../components/Person';
import { getFilmsForPerson } from '../Utils';

const mapStateToProps = ({currentPerson, films}) => {
  const person = currentPerson;
  const selectedFilms = getFilmsForPerson(films, person);
  const shouldShowFilms =
    R.filter(R.prop('pending'), selectedFilms).length === 0 &&
    selectedFilms.length > 0;

  return { person, shouldShowFilms, films: selectedFilms };
};

const mapDispatchToProps = dispatch => ({
  onMount: person => fetchFilmsForPerson(person)(dispatch),
  onBack: () => back()(dispatch)
});


const ContainerPerson = connect(
  mapStateToProps,
  mapDispatchToProps
)(Person);

export default ContainerPerson;