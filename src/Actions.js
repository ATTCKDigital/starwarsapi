import * as R from 'ramda';

const API_BASE = 'https://swapi.co/api';

const endpoints = {
  people: id => API_BASE + '/people/' + (id || ''),
  films: id => API_BASE + '/films/' + (id || '')
};

export const BACK = 'BACK';
export const SHOW_ERROR = 'SHOW_ERROR';

export const REQUEST_PEOPLE = 'REQUEST_PEOPLE';
export const REQUEST_PERSON = 'REQUEST_PERSON';
export const REQUEST_FILM = 'REQUEST_FILM';

export const RECEIVE_PEOPLE = 'RECEIVE_PEOPLE';
export const RECEIVE_PERSON = 'RECEIVE_PERSON';
export const RECEIVE_FILM = 'RECEIVE_FILM';

export const GET_PERSON = 'GET_PERSON';

export const back = () => dispatch => {
  return dispatch({ type: BACK });
};

export const showError = () => ({
  type: SHOW_ERROR
});

export const requestPeople = () => ({
  type: REQUEST_PEOPLE
});

export const requestPerson = () => ({
  type: REQUEST_PERSON
});

export const requestFilm = (id) => ({
  type: REQUEST_FILM,
  id
});

export const receivePeople = (json) => ({
  type: RECEIVE_PEOPLE,
  json: json.results
});

export const receivePerson = (json) => ({
  type: RECEIVE_PERSON,
  json: json
});

export const recieveFilm = (id, json) => ({
  type: RECEIVE_FILM,
  id: id,
  json
});

export const getPeople =
  () => dispatch => {
    dispatch(requestPeople());

    return fetch(endpoints.people())
      .then(res => res.json())
      .then(json => dispatch(receivePeople(json)));
  };

export const getPerson = (id) => dispatch => {
  window.history.pushState(null, null, id);
  dispatch(requestPerson());

  return fetch(endpoints.people(id))
    .then(res => res.json())
    .then(json => {
      // error state
      if(!json.name)
        return dispatch(showError());

      return dispatch(receivePerson(json))
    })
    .catch(() => dispatch(showError()));
}

export const getFilm = (id) => dispatch => {
  dispatch(requestFilm(id));

  fetch(endpoints.films(id))
    .then(res => res.json())
    .then(json => dispatch(recieveFilm(id, json)))
    .catch(() => dispatch(showError()));
};

export const fetchFilmsForPerson = (person) => dispatch =>
  R.map(
    id => getFilm(id)(dispatch),
    person.films
  );