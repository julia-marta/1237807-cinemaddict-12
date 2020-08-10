import {getRandomInteger, getRandomBoolean, getRandomValue} from "../utils.js";
import {generateComments} from "./comment.js";

const MAX_COMMENTS = 5;

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

const phrasesInDescription = {
  min: 1,
  max: 5
};

const filmRating = {
  min: 10,
  max: 100
};

const filmDate = {
  first: new Date(1895, 0, 1),
  last: new Date()
};

const filmDurationInMinutes = {
  min: 5,
  max: 240
};

const filmWritersCount = {
  min: 1,
  max: 3
};

const filmActorsCount = {
  min: 3,
  max: 5
};

const filmGenresCount = {
  min: 1,
  max: 3
};

const generateUniqueCompilation = (source, dictionary) => {
  const {min, max} = dictionary;
  const count = getRandomInteger(min, max);
  const uniqueValues = new Set();

  for (let i = 0; i < count; i++) {
    uniqueValues.add(getRandomValue(source));
  }

  return Array.from(uniqueValues);
};

const generateRating = () => {
  const {min, max} = filmRating;
  return (getRandomInteger(min, max) / 10).toFixed(1);
};

const generateDate = () => {
  const {first, last} = filmDate;
  const minTimestamp = first - new Date(0);
  const maxTimestamp = last - new Date(0);
  const randomTimestamp = getRandomInteger(minTimestamp, maxTimestamp);

  const date = new Date(randomTimestamp);
  return date;
};

const generateDuration = () => {
  const {min, max} = filmDurationInMinutes;
  const duration = getRandomInteger(min, max);

  return duration;
};

const generateFilm = () => {
  const commentsCount = getRandomInteger(0, MAX_COMMENTS);

  return {
    poster: getRandomValue(posters),
    title: getRandomValue(titles),
    originalTitle: getRandomValue(titles),
    rating: generateRating(),
    director: getRandomValue(directors),
    writers: generateUniqueCompilation(writers, filmWritersCount),
    actors: generateUniqueCompilation(actors, filmActorsCount),
    date: generateDate(),
    duration: generateDuration(),
    country: getRandomValue(countries),
    genres: generateUniqueCompilation(genres, filmGenresCount),
    description: generateUniqueCompilation(sourcePhrases, phrasesInDescription),
    age: getRandomValue(ageRatings),
    comments: generateComments(commentsCount),
    isWatchList: getRandomBoolean(),
    isWatched: getRandomBoolean(),
    isFavorites: getRandomBoolean()
  };
};

export const generateFilms = (count) => {
  return new Array(count).fill().map(generateFilm);
};

export const getTopRatedFilms = (films, count) => {
  return films.sort((a, b) => {
    return b.rating - a.rating;
  }).slice(0, count);
};

export const getMostCommentedFilms = (films, count) => {
  return films.sort((a, b) => {
    return b.comments.length - a.comments.length;
  }).slice(0, count);
};
