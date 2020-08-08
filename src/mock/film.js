import {getRandomInteger, getRandomBoolean, getRandomValue} from "../utils.js";
import {generateComments} from "./comment.js";

const MAX_COMMENTS = 5;

const titles = [
  `The Dance of Life`,
  `Sagebrush Trail`,
  `The Man with the Golden Arm`,
  `Santa Claus Conquers the Martians`,
  `Popeye the Sailor Meets Sindbad the Sailor`
];

const posters = [
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`,
];

const genres = [`Musical`, ` Western`, ` Drama`, `Comedy`, `Cartoon`];

const sourceText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const sourcePhrases = sourceText.split(`. `);

const phrasesInDescription = {
  min: 1,
  max: 5
};

const filmRating = {
  min: 10,
  max: 100
};

const filmYear = {
  first: 1895,
  last: new Date().getFullYear()
};

const filmDurationMax = {
  hours: 5,
  minutes: 60
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

const generateYear = () => {
  const {first, last} = filmYear;
  return getRandomInteger(first, last);
};

const generateDuration = () => {
  const {hours, minutes} = filmDurationMax;
  const hoursDuration = getRandomInteger(0, hours);
  const minutesDuration = getRandomInteger(0, minutes);

  return `${hoursDuration > 0 ? `${hoursDuration}h` : ``} ${minutesDuration > 0 ? `${minutesDuration}m` : ``}`;
};

const generateFilm = () => {
  const commentsCount = getRandomInteger(0, MAX_COMMENTS);

  return {
    title: getRandomValue(titles),
    rating: generateRating(),
    year: generateYear(),
    duration: generateDuration(),
    genres: generateUniqueCompilation(genres, filmGenresCount),
    poster: getRandomValue(posters),
    description: generateUniqueCompilation(sourcePhrases, phrasesInDescription),
    comments: generateComments(commentsCount),
    isWatchList: getRandomBoolean(),
    isWatched: getRandomBoolean(),
    isFavorites: getRandomBoolean()
  };
};

export const generateFilms = (count) => {
  return new Array(count).fill().map(generateFilm);
};
