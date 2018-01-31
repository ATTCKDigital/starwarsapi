import * as R from 'ramda';
import React from 'react';
import FilmListItem from './FilmListItem';
import './FilmList.css';

const FilmList = ({films}) => {

  let items = R.pipe(
    R.sortBy(R.prop('release_date')),
    R.map((f) => <FilmListItem key={f.id} {...f} />)
  )(films || []);

  return (
    <div className="FilmList">
      <h2>Films</h2>
      <ul className="FilmList-list">
        {items}
      </ul>
    </div>
  );
};

export default FilmList;