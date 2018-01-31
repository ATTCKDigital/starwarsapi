import R from 'ramda';
import { uriToId } from './Utils';
import {
  REQUEST_PEOPLE,
  RECEIVE_PEOPLE,
  REQUEST_FILM,
  RECEIVE_FILM,
  GET_PERSON
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

const currentPage = (state = SHOW_PEOPLE, action) => {
  switch(action.type) {
    case REQUEST_PEOPLE:
      return SHOW_PEOPLE;
    case GET_PERSON:
      return SHOW_PERSON;
    default:
      return state;
  }
};

const people = (state = [], action) => {
  switch(action.type) {
    case RECEIVE_PEOPLE:
      return R.over(
        R.lensProp('films'),
        R.pipe(
          R.map(uriToId),
          R.reject(isNan)
        ),
        action.json
      );
    default:
      return state;
  }
};

const films = (state = [], actions) => {
  switch(action.type) {
    case REQUEST_FILM:
      return R.append({ episode_id: action.id, pending: true }, state);
    case RECEIVE_FILM:
      return R.pipe(
        R.reject(R.propEq('episode_id', action.id)),
        R.append(action.json)
      )(state);
    default:
      return state;
  }
}

const app = combineReducers({
  pendingQueue,
  currentPage,
  people,
  films
});