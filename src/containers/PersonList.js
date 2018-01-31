import { connect } from 'react-redux';
import { getPerson } from '../Actions';
import PersonList from '../components/PersonList';

const mapStateToProps = state => {
  return { people: state.people, error: state.error };
};
const mapDispatchToProps = dispatch => ({
  onPersonClick: (id) => getPerson(id)(dispatch)
});

const ContainerPersonList = connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonList);

export default ContainerPersonList;