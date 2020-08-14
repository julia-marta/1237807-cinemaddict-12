import {transformMinutesToHours, createElement} from "../utils.js";

const MAX_DESCRIPTION_LENGTH = 140;

const createDescription = (description) => {
  const text = `${description.join(`. `)}.`;

  return (text.length > 140) ? `${text.substring(0, MAX_DESCRIPTION_LENGTH)}...` : text;
};

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
      <span class="film-card__year">${date.getFullYear()}</span>
      <span class="film-card__duration">${transformMinutesToHours(duration)}</span>
      <span class="film-card__genre">${genres[0]}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">
    ${createDescription(description)}
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

export default class FilmCard {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return createFilmCardMarkup(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
