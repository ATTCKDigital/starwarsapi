import React from 'react';
import moment from 'moment';

const FilmListItem = ({ title, release_date }) => (
  <li>
    <strong>{title}</strong>
    <span>{moment(release_date).format('dddd, MMMM D YYYY')}</span>
  </li>
);

export default FilmListItem;