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
  day: {
    first: 1,
    shortlast: 28,
    evenlast: 30,
    last: 31,
  },
  month: {
    first: 0,
    last: 11
  },
  year: {
    first: 1895,
    last: new Date().getFullYear()
  }
};

const filmDurationMax = {
  hours: 4,
  minutes: 60
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
  const {day, month, year} = filmDate;

  const randomYear = getRandomInteger(year.first, year.last);
  const randomMonth = getRandomInteger(month.first, month.last);
  let randomDate;

  switch (randomMonth) {
    case 1:
      randomDate = getRandomInteger(day.first, day.shortlast);
      break;
    case (3 || 5 || 8 || 10):
      randomDate = getRandomInteger(day.first, day.evenlast);
      break;
    default:
      randomDate = getRandomInteger(day.first, day.last);
  }

  const date = new Date(randomYear, randomMonth, randomDate);

  return date;
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
