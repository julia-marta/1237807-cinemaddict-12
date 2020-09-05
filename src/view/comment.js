import AbstractView from "./abstract.js";
import {humanizeCommentDate} from "../utils/film.js";

const createCommentMarkup = (comment) => {
  const {emoji, text, author, day} = comment;
  const date = humanizeCommentDate(day);

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
      <img src="${emoji}" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
      <p class="film-details__comment-text">${text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${date}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
      </div>
      </li>`
  );
};

export default class Comment extends AbstractView {
  constructor(comment) {
    super();
    this._comment = comment;
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
  }

  getTemplate() {
    return createCommentMarkup(this._comment);
  }

  _deleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(this._comment);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.film-details__comment-delete`).addEventListener(`click`, this._deleteClickHandler);
  }
}
