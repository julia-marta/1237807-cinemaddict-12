const shuffleItems = (items) => {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = items[i];
    items[i] = items[j];
    items[j] = temp;
  }
  return items;
};

export const sortByRating = (films) => {
  const allRatings = new Set();
  films.forEach((film) => allRatings.add(film.rating));

  if (allRatings.size === 1) {
    return shuffleItems(films);
  }

  return films.sort((a, b) => {
    return b.rating - a.rating;
  });
};

export const sortByCommentsCount = (films) => {
  const allComments = new Set();
  films.forEach((film) => allComments.add(film.comments.length));

  if (allComments.size === 1) {
    return shuffleItems(films);
  }

  return films.sort((a, b) => {
    return b.comments.length - a.comments.length;
  });
};

export const sortByDate = (films) => {
  return films.sort((a, b) => {
    return b.date.getTime() - a.date.getTime();
  });
};
