import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import PersonList from './containers/PersonList';
import Person from './containers/Person';

const mapStateToProps = ({ currentPerson }) => ({ currentPerson });

const UnconnectedApp = ({currentPerson}) => 
  currentPerson != null ?
    <Person /> :
    <PersonList />;

const App = connect(
  mapStateToProps,
  () => ({})
)(UnconnectedApp);

export default App;
