import * as R from 'ramda';

export const uriToId = 
  R.pipe(
    R.match(/\d+/),
    R.head,
    parseInt
  );

export const containsList = R.curry(
  (containerList, searchList) =>
    R.reduce(
      (acc, v) => acc ? acc : R.contains(v, containerList),
      false,
      searchList
    )
  );
export const hasPendingFilm = R.curry(
  (films, person) => 
    R.pipe(
      R.filter(R.prop('pending')),
      R.map(R.prop('id')),
      containsList(person.films)
    )
);

export const filmListToIds = (person) => {
  return R.merge(
    person,
    {
      films: R.pipe(
          R.map(uriToId),
          R.reject(R.equals(NaN))
        )(person.films || [])
    }
  );
};

export const personUriToId = (person) =>
  R.merge(person, { id: uriToId(person.url) })

export const getFilmsForPerson =
  R.curry((films, person) =>
    person && person.films ?
      R.filter(R.pipe(
        R.prop('id'),
        R.contains(R.__, person.films)
      ), films) :
      []
  );