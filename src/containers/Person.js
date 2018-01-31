import * as R from 'ramda';
import { connect } from 'react-redux';
import { getPerson, fetchFilmsForPerson, back } from '../Actions';
import Person from '../components/Person';
import { getFilmsForPerson } from '../Utils';

const mapStateToProps = ({currentPerson, people, films}) => {
  const person = 
    R.pipe(
      R.filter(R.propEq('id', currentPerson)),
      R.head
    )(people);

  const selectedFilms = getFilmsForPerson(films, person);
  const shouldShowFilms =
    R.filter(R.prop('pending'), selectedFilms).length === 0 &&
    selectedFilms.length > 0;

  return { person, shouldShowFilms, films: selectedFilms };
};

const mapDispatchToProps = dispatch => ({
  onMount: person => fetchFilmsForPerson(person)(dispatch),
  onBack: () => dispatch(back())
});


const ContainerPerson = connect(
  mapStateToProps,
  mapDispatchToProps
)(Person);

export default ContainerPerson;