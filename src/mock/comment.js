import {getRandomInteger, getRandomValue} from "../utils.js";

const MAX_DAYS_GUP = 30;

const EMOJIS = [
  `./images/emoji/angry.png`,
  `./images/emoji/puke.png`,
  `./images/emoji/sleeping.png`,
  `./images/emoji/smile.png`
];

const COMMENTS = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`
];

const generateRandomName = () => {
  const names = [`John`, `Jimmy`, `Cary`, `Alfred`];
  const surnames = [`Doe`, `Stewart`, `Grant`, `Hitchcock`];

  return `${getRandomValue(names)} ${getRandomValue(surnames)}`;
};

const generateDate = () => {
  const daysGap = getRandomInteger(-MAX_DAYS_GUP, MAX_DAYS_GUP);
  const currentDate = new Date();

  currentDate.setHours(23, 59, 59, 999);
  currentDate.setDate(currentDate.getDate() + daysGap);

  return currentDate;
};

const generateComment = () => {
  return {
    emoji: getRandomValue(EMOJIS),
    text: getRandomValue(COMMENTS),
    author: generateRandomName(),
    day: generateDate()
  };
}

export const generateComments = (count) => {
  return new Array(count).fill().map(generateComment);
};
