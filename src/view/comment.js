import SmartView from "./smart.js";
import {humanizeCommentDate} from "../utils/film.js";

const createCommentMarkup = (data) => {
  const {emoji, text, author, day, isDeleting} = data;
  const date = humanizeCommentDate(day);

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
      <p class="film-details__comment-text">${text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${date}</span>
        <button class="film-details__comment-delete" ${isDeleting ? `disabled` : ``}>
        ${isDeleting ? `Deleting…` : `Delete`}
        </button>
      </p>
      </div>
      </li>`
  );
};

export default class Comment extends SmartView {
  constructor(comment) {
    super();
    this._data = Comment.parseCommentToData(comment);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
  }

  getTemplate() {
    return createCommentMarkup(this._data);
  }

  restoreHandlers() {
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  _deleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(Comment.parseDataToComment(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.film-details__comment-delete`).addEventListener(`click`, this._deleteClickHandler);
  }

  static parseCommentToData(comment) {
    return Object.assign({}, comment, {isDeleting: false});
  }

  static parseDataToComment(data) {
    data = Object.assign({}, data);

    delete data.isDeleting;
    return data;
  }
}
