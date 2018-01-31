import * as R from 'ramda';
import { combineReducers } from 'redux'
import { filmListToIds, personUriToId } from './Utils';
import {
  REQUEST_PEOPLE,
  RECEIVE_PEOPLE,
  RECEIVE_PERSON,
  REQUEST_FILM,
  RECEIVE_FILM,
  BACK,
  SHOW_ERROR
} from './Actions';

const characters = [
  {
    "name": "Luke Skywalker",
    "url": "https://swapi.co/api/people/1/",
    "id": 1
  }, {
    "name": "Darth Vader",
    "url": "https://swapi.co/api/people/4/",
    "id": 4
  }, {
    "name": "Obi-wan Kenobi",
    "url": "https://swapi.co/api/people/unknown/",
    "id": "unknown"
  }, {
    "name": "R2-D2",
    "url": "https://swapi.co/api/people/3/",
    "id": 3
  }
];

const error = (state = false, action) => {
  switch(action.type) {
    case SHOW_ERROR:
      return true;
    case RECEIVE_FILM:
    case RECEIVE_PERSON:
      return false;
    default:
      return state;
  }
};

const currentPerson = (state = null, action) => {
  switch(action.type) {
    case BACK:
    case REQUEST_PEOPLE:
      return null;
    case RECEIVE_PERSON:
      return R.pipe(
          filmListToIds,
          personUriToId
        )(action.json);
    default:
      return state;
  }
};

const people = (state = characters, action) => {
  switch(action.type) {
    case RECEIVE_PEOPLE:
      return R.map(
        R.pipe(
          filmListToIds,
          personUriToId
        ),
        action.json);
    case RECEIVE_PERSON:
        return R.map(p =>
          p.id === action.id ? R.merge(p, action.json): p,
          state
        );
    default:
      return state;
  }
};

const films = (state = [], action) => {
  switch(action.type) {
    case REQUEST_FILM:
      return R.append({ id: action.id, pending: true }, state);
    case RECEIVE_FILM:
      return R.pipe(
        R.reject(R.propEq('id', action.id)),
        R.append(R.merge(action.json, { id: action.id }))
      )(state);
    default:
      return state;
  }
}

const app = combineReducers({
  error,
  currentPerson,
  people,
  films
});

export default app;