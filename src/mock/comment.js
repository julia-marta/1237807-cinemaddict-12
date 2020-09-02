import {getRandomInteger, getRandomValue, generateID} from "../utils/common.js";
import {EMOJIS} from "../const.js";

const MAX_COMMENTS = 5;
const MAX_DAYS_GUP = 30;
const MAX_HOURS = 23;
const MAX_MINUTES = 59;

const comments = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`
];

const names = [
  `John`,
  `Jimmy`,
  `Cary`,
  `Alfred`
];

const surnames = [
  `Doe`,
  `Stewart`,
  `Grant`,
  `Hitchcock`
];

const generateRandomName = () => {

  return `${getRandomValue(names)} ${getRandomValue(surnames)}`;
};

const generateDate = () => {
  const daysGap = getRandomInteger(-MAX_DAYS_GUP, 0);
  const currentDate = new Date();

  currentDate.setHours(getRandomInteger(0, MAX_HOURS), getRandomInteger(0, MAX_MINUTES));
  currentDate.setDate(currentDate.getDate() + daysGap);

  return currentDate;
};

const generateComment = () => {
  return {
    id: generateID(),
    emoji: getRandomValue(EMOJIS),
    text: getRandomValue(comments),
    author: generateRandomName(),
    day: generateDate()
  };
};

export const generateComments = () => {
  const count = getRandomInteger(0, MAX_COMMENTS);
  return new Array(count).fill().map(generateComment);
};
