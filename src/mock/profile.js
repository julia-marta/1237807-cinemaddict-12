import {getRandomInteger} from "../utils/common.js";

const MAX_WATCHED_FILMS = 100;

const rankSteps = {
  low: 1,
  middle: 10,
  high: 20
};

const {low, middle, high} = rankSteps;

const userRank = {
  novice: (watched) => watched >= low && watched <= middle,
  fan: (watched) => watched > middle && watched <= high,
  moviebuff: (watched) => watched > high
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
