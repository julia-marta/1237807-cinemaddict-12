import AbstractView from "./abstract.js";
import {formatDuration, formatDate} from "../utils/film.js";

const createFilmCardMarkup = (film) => {
  const {poster, title, rating, date, duration, genres, description, comments, isWatchList, isWatched, isFavorites} = film;

  const addActiveClassName = (flag) => {
    return (flag) ? `film-card__controls-item--active` : ``;
  };

  return (
    `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${formatDate(date)}</span>
      <span class="film-card__duration">${formatDuration(duration)}</span>
      <span class="film-card__genre">${genres[0]}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">
    ${description}
    </p>
    <a class="film-card__comments">${comments.length} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button
      film-card__controls-item--add-to-watchlist ${addActiveClassName(isWatchList)}">Add to watchlist</button>
      <button class="film-card__controls-item button
      film-card__controls-item--mark-as-watched ${addActiveClassName(isWatched)}">Mark as watched</button>
      <button class="film-card__controls-item button
      film-card__controls-item--favorite ${addActiveClassName(isFavorites)}">Mark as favorite</button>
    </form>
    </article>`
  );
};

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;

    this._filmDetailsClickHandler = this._filmDetailsClickHandler.bind(this);
    this._controlsClickHandler = this._controlsClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardMarkup(this._film);
  }

  _filmDetailsClickHandler(evt) {
    evt.preventDefault();
    if (evt.target.classList.contains(`film-card__poster`) || evt.target.classList.contains(`film-card__title`) || evt.target.classList.contains(`film-card__comments`)) {
      this._callback.filmDetailsClick();
    }
  }

  _controlsClickHandler(evt) {
    evt.preventDefault();
    switch (true) {
      case evt.target.classList.contains(`film-card__controls-item--add-to-watchlist`):
        this._callback.controlsClick(Object.assign({}, this._film, {isWatchList: !this._film.isWatchList}));
        break;
      case evt.target.classList.contains(`film-card__controls-item--mark-as-watched`):
        this._callback.controlsClick(Object.assign({}, this._film, {isWatched: !this._film.isWatched, watchedDate: new Date()}));
        break;
      case evt.target.classList.contains(`film-card__controls-item--favorite`):
        this._callback.controlsClick(Object.assign({}, this._film, {isFavorites: !this._film.isFavorites}));
        break;
    }
  }

  setControlsClickHandler(callback) {
    this._callback.controlsClick = callback;
    this.getElement().querySelector(`.film-card__controls`).addEventListener(`click`, this._controlsClickHandler);
  }

  setFilmDetailsClickHandler(callback) {
    this._callback.filmDetailsClick = callback;
    this.getElement().addEventListener(`click`, this._filmDetailsClickHandler);
  }
}
