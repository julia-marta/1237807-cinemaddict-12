import {getRandomInteger, getRandomBoolean, getRandomValue, generateUniqueCompilation, generateID} from "../utils/common.js";
import {generateComments} from "./comment.js";

const posters = [
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`,
];

const titles = [
  `The Dance of Life`,
  `Sagebrush Trail`,
  `The Man with the Golden Arm`,
  `Santa Claus Conquers the Martians`,
  `Popeye the Sailor Meets Sindbad the Sailor`
];

const directors = [
  `Stanley Kubrick`,
  `Alfred Hitchcock`,
  `David Lynch`,
  `Quentin Tarantino`,
  `Billy Wilder`
];

const writers = [
  `Steven King`,
  `Joel Coen`,
  `Frank Darabont`,
  `Sergio Leone`,
  `Martin Scorsese`
];

const actors = [
  `James Stewart`,
  `Leonardo DiCaprio`,
  `Liam Neeson`,
  `Christoph Waltz`,
  `Eva Green`,
  `Bette Davis`,
  `Jodie Foster`,
  `Marlene Dietrich`,
  `Kate Winslet`
];

const countries = [
  `USA`,
  `Canada`,
  `UK`,
  `France`,
  `Spain`
];

const genres = [
  `Film-Noir`,
  `Horror`,
  `Drama`,
  `Comedy`,
  `Mystery`
];

const ageRatings = [`0`, `6`, `12`, `16`, `18`];

const sourceText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const sourcePhrases = sourceText.substr(0, sourceText.length - 1).split(`. `);

const FilmDate = {
  FIRST: new Date(1895, 0, 1),
  LAST: new Date()
};

const WatchedDate = {
  FIRST: new Date(2019, 8, 1),
  LAST: new Date()
};

const PhrasesCount = {
  MIN: 1,
  MAX: 5
};

const FilmRating = {
  MIN: 10,
  MAX: 100
};

const FilmDuration = {
  MIN: 5,
  MAX: 240
};

const FilmWritersCount = {
  MIN: 1,
  MAX: 3
};

const FilmActorsCount = {
  MIN: 3,
  MAX: 5
};

const FilmGenresCount = {
  MIN: 1,
  MAX: 3
};

const generateRating = () => {
  const {MIN, MAX} = FilmRating;
  return (getRandomInteger(MIN, MAX) / 10).toFixed(1);
};

const generateDate = (first, last) => {
  const minTimestamp = first - new Date(0);
  const maxTimestamp = last - new Date(0);
  const randomTimestamp = getRandomInteger(minTimestamp, maxTimestamp);

  const date = new Date(randomTimestamp);
  return date;
};

const generateDuration = () => {
  const {MIN, MAX} = FilmDuration;
  const duration = getRandomInteger(MIN, MAX);

  return duration;
};

const generateFilm = () => {

  return {
    id: generateID(),
    poster: getRandomValue(posters),
    title: getRandomValue(titles),
    originalTitle: getRandomValue(titles),
    rating: generateRating(),
    director: getRandomValue(directors),
    writers: generateUniqueCompilation(writers, FilmWritersCount),
    actors: generateUniqueCompilation(actors, FilmActorsCount),
    date: generateDate(FilmDate.FIRST, FilmDate.LAST),
    duration: generateDuration(),
    country: getRandomValue(countries),
    genres: generateUniqueCompilation(genres, FilmGenresCount),
    description: generateUniqueCompilation(sourcePhrases, PhrasesCount),
    age: getRandomValue(ageRatings),
    comments: generateComments(),
    isWatchList: getRandomBoolean(),
    isWatched: getRandomBoolean(),
    isFavorites: getRandomBoolean()
  };
};

export const generateFilms = (count) => {
  const films = new Array(count).fill().map(generateFilm);
  const filmsWithDates = films.map((film) =>
    film.isWatched ? Object.assign({}, film, {watchedDate: generateDate(WatchedDate.FIRST, WatchedDate.LAST)}) : film);

  return filmsWithDates;
};
