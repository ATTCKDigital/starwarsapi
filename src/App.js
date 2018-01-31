import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import PersonList from './containers/PersonList';
import Person from './containers/Person';
import { getPeople } from './Actions';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  onMount: () => getPeople()(dispatch)
});

class UnconnectedApp extends Component {
  componentDidMount() {
    this.props.onMount();
  }
  render() {
    if(this.props.currentPerson !== 0) 
      return <Person />;

    return <PersonList />;
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedApp);

export default App;
