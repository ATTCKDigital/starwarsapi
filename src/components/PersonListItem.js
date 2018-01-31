import * as R from 'ramda';
import React from 'react';

const PersonListItem = R.curry((onClick, {id, name}) => (
    <li>
      <a href="#" onClick={() => onClick(id)}>{name}</a>
    </li>
));

export default PersonListItem;