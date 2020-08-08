const addFilteredFilmsCount = (filter, check) => {
  return (check) ? (filter || 0) + 1 : filter || 0;
};

export const generateFilters = (films) => {
  return films.reduce((filter, film) => {
    filter.watchlist = addFilteredFilmsCount(filter.watchlist, film.isWatchList);
    filter.history = addFilteredFilmsCount(filter.history, film.isWatched);
    filter.favorites = addFilteredFilmsCount(filter.favorites, film.isFavorites);

    return filter;
  }, {});
};
