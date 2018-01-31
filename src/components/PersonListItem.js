import * as R from 'ramda';
import React from 'react';
import './PersonListItem.css';

const PersonListItem = R.curry(({id, name, onClick}) => {
  let click = (e) => {
    e.preventDefault();
    onClick(id);
  };

  return (
    <li className="PersonListItem" onClick={click}>
      {name}
    </li>
  );
});

export default PersonListItem;