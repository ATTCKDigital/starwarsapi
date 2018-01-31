import * as R from 'ramda';
import React from 'react';
import FilmListItem from './FilmListItem';

const FilmList = ({films}) => {
  let items = R.map((f) => <FilmListItem {...f} />, films || []);
  return (
    <ul>
      {items}
    </ul>
  );
};

export default FilmList;