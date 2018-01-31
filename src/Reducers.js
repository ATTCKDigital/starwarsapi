import * as R from 'ramda';
import { combineReducers } from 'redux'
import { filmListToIds, personUriToId } from './Utils';
import {
  REQUEST_PEOPLE,
  RECEIVE_PEOPLE,
  REQUEST_FILM,
  RECEIVE_FILM,
  GET_PERSON,
  BACK
} from './Actions';

const pages = {
  SHOW_PEOPLE: 'SHOW_PEOPLE',
  SHOW_PERSON: 'SHOW_PERSON'
};

const pendingQueue = (state = 0, action) => {
  switch(action.type) {
    case REQUEST_PEOPLE:
    case REQUEST_FILM:
      return state + 1;
    case RECEIVE_PEOPLE:
    case RECEIVE_FILM:
      return state - 1;
    default:
      return state
  }
};

const currentPerson = (state = 0, action) => {
  switch(action.type) {
    case BACK:
    case REQUEST_PEOPLE:
      return 0;
    case GET_PERSON:
      return action.id;
    default:
      return state;
  }
};

const people = (state = [], action) => {
  switch(action.type) {
    case RECEIVE_PEOPLE:
      return R.map(
        R.pipe(
          filmListToIds,
          personUriToId,
        ),
        action.json);
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
  pendingQueue,
  currentPerson,
  people,
  films
});

export default app;