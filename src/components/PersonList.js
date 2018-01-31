import * as R from 'ramda';
import React from 'react';
import PersonListItem from './PersonListItem';

const PersonList = ({people, onPersonClick}) => {
  return (
    <div>
      <h1>Star Wars Characters</h1>
      <ul>
        {R.map(PersonListItem(onPersonClick), people || [])}
      </ul>
    </div>
  );
}

export default PersonList;
