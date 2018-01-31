import * as R from 'ramda';
import React from 'react';
import './PersonList.css';
import PersonListItem from './PersonListItem';

const PersonList = ({people, onPersonClick, error}) => {
  const errorMsg = error ?
    <div class="PersonList-error">Something went wrong!</div> :
    <div />;

  return (
    <div className="PersonList">
      <h1 className="PersonList-header">Star Wars Characters</h1>
      {errorMsg}
      <ul className="PersonList-list">
        {R.map(p => <PersonListItem onClick={onPersonClick} key={p.id} {...p} />, people || [])}
      </ul>
    </div>
  );
}

export default PersonList;
