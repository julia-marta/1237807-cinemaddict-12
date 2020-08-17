const MINUTES_IN_HOURS = 60;

export const transformMinutesToHours = (minutes) => {
  const hoursCount = Math.floor(minutes / MINUTES_IN_HOURS);
  const minutesCount = minutes - MINUTES_IN_HOURS * hoursCount;

  return `${hoursCount > 0 ? `${hoursCount}h` : ``} ${minutesCount > 0 ? `${minutesCount}m` : ``}`;
};

export const getRandomInteger = (min = 0, max = 1) => {
  return Math.floor(min + Math.random() * (max - min + 1));
};

export const getRandomBoolean = () => {
  return Boolean(getRandomInteger(0, 1));
};

export const getRandomValue = (items) => {
  const randomIndex = getRandomInteger(0, items.length - 1);
  return items[randomIndex];
};

export const generateUniqueCompilation = (items, limits) => {
  const {MIN, MAX} = limits;
  const count = getRandomInteger(MIN, MAX);
  const uniqueValues = new Set();

  for (let i = 0; i < count; i++) {
    uniqueValues.add(getRandomValue(items));
  }

  return Array.from(uniqueValues);
};
