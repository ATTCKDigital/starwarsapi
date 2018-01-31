import React from 'react';
import moment from 'moment';
import './FilmListItem.css'

const FilmListItem = ({ title, release_date }) => (
  <li className="FilmListItem">
    <strong>{title}</strong>
    <span>{moment(release_date).format('dddd, MMMM D YYYY')}</span>
  </li>
);

export default FilmListItem;