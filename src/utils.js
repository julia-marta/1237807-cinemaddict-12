const MINUTES_IN_HOURS = 60;

export const getRandomInteger = (min = 0, max = 1) => {
  return Math.floor(min + Math.random() * (max - min + 1));
};

export const getRandomBoolean = () => {
  return Boolean(getRandomInteger(0, 1));
};

export const getRandomValue = (list) => {
  const randomIndex = getRandomInteger(0, list.length - 1);
  return list[randomIndex];
};

export const transformMinutesToHours = (minutes) => {
  const hoursCount = Math.floor(minutes / MINUTES_IN_HOURS);
  const minutesCount = minutes - MINUTES_IN_HOURS  * hoursCount;

  return `${hoursCount > 0 ? `${hoursCount}h` : ``} ${minutesCount > 0 ? `${minutesCount}m` : ``}`;
}



