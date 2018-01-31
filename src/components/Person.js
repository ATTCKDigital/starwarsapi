import React, { Component } from 'react';
import FilmList from './FilmList';
import './Person.css';

class Person extends Component {
  constructor(props) {
    super(props);

    // trick to make sure removing the listener works properly
    this.back = this.back.bind(this);
  }
  componentDidMount() {
    window.addEventListener('popstate', this.back);
    this.props.onMount(this.props.person)
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.back);
  }

  back(e) {
    e.preventDefault();
    this.props.onBack();
  }

  render() {
    const { person, films, shouldShowFilms } = this.props;

    const filmList = shouldShowFilms ?
      <FilmList films={films} /> :
      <span>Loading...</span>;

    return (
      <div className="Person">
        <button onClick={() => window.history.back()} className="Person-back">Back</button>
        <h1 className="Person-header">{person.name}</h1>
        <div className="Person-content">
          <ul className="Person-proplist">
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
          {filmList}
        </div>
      </div>
    );
  };
}

export default Person;