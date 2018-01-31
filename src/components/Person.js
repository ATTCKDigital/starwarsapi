import React, { Component } from 'react';
import { hasPendingFilm, getFilmsForPerson } from '../Utils';
import FilmList from './FilmList';

class Person extends Component {
  componentDidMount() {
    this.props.onMount(this.props.person)
  }

  render() {
    const { person, films, shouldShowFilms, onBack } = this.props;

    const filmList = shouldShowFilms ?
      <FilmList films={films} /> :
      <span>Loading...</span>;

    return (
      <div>
        <a href="#" onClick={onBack}>Back</a>
        <h1>{person.name}</h1>
        <ul>
          <li>
            <strong>Height:</strong>
            <span>{person.height}</span>
          </li>
          <li>
            <strong>Mass:</strong>
            <span>{person.mass}</span>
          </li>
          <li>
            <strong>Hair Color:</strong>
            <span>{person.hair_color}</span>
          </li>
          <li>
            <strong>Skin Color:</strong>
            <span>{person.skin_color}</span>
          </li>
          <li>
            <strong>Eye Color:</strong>
            <span>{person.eye_color}</span>
          </li>
          <li>
            <strong>Gender:</strong>
            <span>{person.gender}</span>
          </li>
        </ul>
        <hr/>
        <h2>Films</h2>
        {filmList}
      </div>
    );
  };
}

export default Person;