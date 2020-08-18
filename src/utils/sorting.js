export const sortByRating = (films) => {
  return films.sort((a, b) => {
    return b.rating - a.rating;
  });
};

export const sortByCommentsCount = (films) => {
  return films.sort((a, b) => {
    return b.comments.length - a.comments.length;
  });
};

export const sortByDate = (films) => {
  return films.sort((a, b) => {
    return b.date.getTime() - a.date.getTime();
  });
};
