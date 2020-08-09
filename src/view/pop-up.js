import {createCommentsMarkup} from "./comments.js";

const createGenresMarkup = (genres) => {

  const genresList = genres.map((genre) => {
    return `<span class="film-details__genre">${genre}</span>`;
  });

  const genresTitle = (genresList.length > 1) ? `Genres` : `Genre`;

  return (`<tr class="film-details__row">
    <td class="film-details__term">${genresTitle}</td>
    <td class="film-details__cell">
     ${genresList.join(``)}
    </td>
  </tr>`
  );
};

const createFilmDetailsMarkup = (film) => {
  const {director, writers, actors, date, duration, country, genres} = film;

  const genresMarkup = createGenresMarkup(genres);

  return (
    `<table class="film-details__table">
  <tr class="film-details__row">
    <td class="film-details__term">Director</td>
    <td class="film-details__cell">${director}</td>
  </tr>
  <tr class="film-details__row">
    <td class="film-details__term">Writers</td>
    <td class="film-details__cell">${writers.join(`, `)}</td>
  </tr>
  <tr class="film-details__row">
    <td class="film-details__term">Actors</td>
    <td class="film-details__cell">${actors.join(`, `)}</td>
  </tr>
  <tr class="film-details__row">
    <td class="film-details__term">Release Date</td>
    <td class="film-details__cell">${date.toLocaleString(`en-GB`, {day: `numeric`, month: `long`, year: `numeric`})}</td>
  </tr>
  <tr class="film-details__row">
    <td class="film-details__term">Runtime</td>
    <td class="film-details__cell">${duration}</td>
  </tr>
  <tr class="film-details__row">
    <td class="film-details__term">Country</td>
    <td class="film-details__cell">${country}</td>
  </tr>
  ${genresMarkup}
</table>`
  );
};

export const createPopUpMarkup = (film) => {
  const {poster, title, originalTitle, rating, description, age, comments} = film;

  const filmDetailsMarkup = createFilmDetailsMarkup(film);
  const commentsMarkup = createCommentsMarkup(comments);

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="${title}">
              <p class="film-details__age">${age}+</p>
            </div>
            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${originalTitle}</p>
                </div>
                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>
              ${filmDetailsMarkup}
              <p class="film-details__film-description">${description.join(`. `)}.</p>
            </div>
          </div>
          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>
        <div class="form-details__bottom-container">
          ${commentsMarkup}
        </div>
      </form>
    </section>`
  );
};
