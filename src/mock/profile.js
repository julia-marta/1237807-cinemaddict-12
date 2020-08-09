import {getRandomInteger} from "../utils.js";

const MAX_WATCHED_FILMS = 100;

const userRank = {
  novice: (watched) => watched >= 1 && watched <= 10,
  fan: (watched) => watched > 10 && watched <= 20,
  moviebuff: (watched) => watched >= 21
};

const getRank = (count) => {
  const {novice, fan, moviebuff} = userRank;
  let rank;

  if (novice(count)) {
    rank = `Novice`;
  } else if (fan(count)) {
    rank = `Fan`;
  } else if (moviebuff(count)) {
    rank = `Movie Buff`;
  } else {
    rank = `none`;
  }

  return rank;
};

export const generateProfile = () => {
  const watchedFilms = getRandomInteger(0, MAX_WATCHED_FILMS);

  return {
    watched: watchedFilms,
    rank: getRank(watchedFilms)
  };
};
