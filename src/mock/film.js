import {
  FilmTitles,
  Posters,
  Genres,
  AgeLimits,
  Countries,
  Directors,
  Writers,
  Actors
} from "./film-data.js";

import {
  getRandomArrayItem,
  getRandomBoolean,
  DummyText
} from "./utils.js";

import {
  getRandomWriters,
  getRandomCast,
  getRandomRating,
  getRandomReleaseDate,
  getRandomDuration,
  getRandomGenres,
  getRandomDescription,
  getCommentsCount
} from "./film-utils.js";

import {generateComments} from "./comment.js";

const generateFilm = () => {

  const title = getRandomArrayItem(FilmTitles);
  const releaseDate = getRandomReleaseDate();

  return {
    title: {
      main: title.main,
      original: title.original
    },
    director: getRandomArrayItem(Directors),
    writers: getRandomWriters(Writers),
    cast: getRandomCast(Actors),
    release: `${releaseDate.day} ${releaseDate.month} ${releaseDate.year}`,
    rating: getRandomRating(),
    year: `${releaseDate.year}`,
    duration: getRandomDuration(),
    country: getRandomArrayItem(Countries),
    ageLimit: getRandomArrayItem(AgeLimits),
    genres: getRandomGenres(Genres),
    poster: `./images/posters/${getRandomArrayItem(Posters)}`,
    description: getRandomDescription(DummyText),
    comments: generateComments(getCommentsCount()),
    isAddedToWatchlist: getRandomBoolean(),
    isMarkedAsWatched: getRandomBoolean(),
    isFavorite: getRandomBoolean()
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};


export {generateFilms};
