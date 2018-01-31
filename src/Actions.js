import * as R from 'ramda';

const API_BASE = 'https://swapi.co/api';

const endpoints = {
  people: id => API_BASE + '/people/' + (id || ''),
  films: id => API_BASE + '/films/' + (id || '')
};

export const BACK = 'BACK';

export const REQUEST_PEOPLE = 'REQUEST_PEOPLE';
export const REQUEST_FILM = 'REQUEST_FILM';

export const RECEIVE_PEOPLE = 'RECEIVE_PEOPLE';
export const RECEIVE_FILM = 'RECEIVE_FILM';

export const GET_PERSON = 'GET_PERSON';

export const back = () => ({
  type: BACK
});

export const requestPeople = () => ({
  type: REQUEST_PEOPLE
});

export const requestFilm = (id) => ({
  type: REQUEST_FILM,
  id
});

export const receivePeople = (json) => ({
  type: RECEIVE_PEOPLE,
  json: json.results
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
      .then(json => {
        return dispatch(receivePeople(json))
      });
  };

export const getPerson = (id) => dispatch => {
  dispatch({ type: GET_PERSON, id });
}

export const getFilm = (id) => dispatch => {
  dispatch(requestFilm(id));

  fetch(endpoints.films(id))
    .then(res => res.json())
    .then(json => {
      return dispatch(recieveFilm(id, json));
    })
};

export const fetchFilmsForPerson = (person) => dispatch =>
  R.map(
    id => getFilm(id)(dispatch),
    person.films
  );