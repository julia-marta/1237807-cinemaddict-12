import SmartView from "./smart.js";
import {transformMinutesToHours} from "../utils/common.js";
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
    <td class="film-details__cell">${transformMinutesToHours(duration)}</td>
  </tr>
  <tr class="film-details__row">
    <td class="film-details__term">Country</td>
    <td class="film-details__cell">${country}</td>
  </tr>
  ${genresMarkup}
</table>`
  );
};

const createPopUpMarkup = (data) => {
  const {poster, title, originalTitle, rating, description, age, comments, isWatchList, isWatched, isFavorites, isEmoji, emojiName} = data;

  const filmDetailsMarkup = createFilmDetailsMarkup(data);
  const commentsMarkup = createCommentsMarkup(comments, isEmoji, emojiName);

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
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isWatchList ? `checked` : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? `checked` : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorites ? `checked` : ``}>
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

export default class PopUp extends SmartView {
  constructor(film, emoji) {
    super();
    this._emoji = emoji || {isEmoji: false, emojiName: ``};
    this._data = PopUp.parseFilmToData(film, this._emoji);
    this._closeButtonClickHandler = this._closeButtonClickHandler.bind(this);
    this._controlsToggleHandler = this._controlsToggleHandler.bind(this);
    this._emojiToggleHandler = this._emojiToggleHandler.bind(this);
    this._setInnerHandlers();
  }

  reset(film) {
    this._emoji = {isEmoji: false, emojiName: ``};
    this.updateData(PopUp.parseFilmToData(film, this._emoji));
  }

  getTemplate() {
    return createPopUpMarkup(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setCloseButtonClickHandler(this._callback.closeButtonClick);
    this.setControlsToggleHandler(this._callback.controlsToggle);
  }

  restoreEmoji() {
    return this._emoji;
  }

  _closeButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeButtonClick();
  }

  _controlsToggleHandler(evt) {
    evt.preventDefault();
    switch (evt.target.id) {
      case `watchlist`:
        this._callback.controlsToggle(Object.assign({}, PopUp.parseDataToFilm(this._data), {isWatchList: evt.target.checked}));
        break;
      case `watched`:
        this._callback.controlsToggle(Object.assign({}, PopUp.parseDataToFilm(this._data), {isWatched: evt.target.checked}));
        break;
      case `favorite`:
        this._callback.controlsToggle(Object.assign({}, PopUp.parseDataToFilm(this._data), {isFavorites: evt.target.checked}));
        break;
    }
  }

  _emojiToggleHandler(evt) {
    evt.preventDefault();
    this._emoji = {isEmoji: true, emojiName: evt.target.value};
    this.updateData(this._emoji);
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`change`, this._emojiToggleHandler);
  }

  setCloseButtonClickHandler(callback) {
    this._callback.closeButtonClick = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._closeButtonClickHandler);
  }

  setControlsToggleHandler(callback) {
    this._callback.controlsToggle = callback;
    this.getElement().querySelector(`.film-details__controls`).addEventListener(`change`, this._controlsToggleHandler);
  }

  static parseFilmToData(film, emoji) {
    return Object.assign({}, film, emoji);
  }

  static parseDataToFilm(data) {
    data = Object.assign({}, data);

    delete data.isEmoji;
    delete data.emojiName;

    return data;
  }
}
