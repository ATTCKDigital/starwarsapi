import R from 'ramda';

export const uriToId = s =>
  R.pipe(
    R.match(/\d+/),
    R.head,
    parseInt
  );

export const hasPendingFilm = R.curry(
  (films, person) => 
    R.pipe(
      R.filter(R.prop('pending')),
      R.map(R.prop('episode_id')),
      R.reduce(
        (acc, v) => acc ? acc : R.contains(arr, person.films),
        false
      )
    )
);