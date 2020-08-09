import {getRandomInteger, getRandomValue} from "../utils.js";

const MAX_DAYS_GUP = 30;
const MAX_HOURS = 23;
const MAX_MINUTES = 59;

const emojis = [
  `./images/emoji/angry.png`,
  `./images/emoji/puke.png`,
  `./images/emoji/sleeping.png`,
  `./images/emoji/smile.png`
];

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
    emoji: getRandomValue(emojis),
    text: getRandomValue(comments),
    author: generateRandomName(),
    day: generateDate()
  };
};

export const generateComments = (count) => {
  return new Array(count).fill().map(generateComment);
};
