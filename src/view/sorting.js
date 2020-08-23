import AbstractView from "./abstract.js";
import {SortType} from "../const.js";

const {DEFAULT, DATE, RATING} = SortType;

const createSortingMarkup = () => {
  return (
    `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type="${DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${RATING}">Sort by rating</a></li>
    </ul>`
  );
};

export default class Sorting extends AbstractView {
  constructor() {
    super();
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortingMarkup();
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }
    evt.preventDefault();
    this.getElement().querySelector(`.sort__button--active`).classList.remove(`sort__button--active`);
    evt.target.classList.add(`sort__button--active`);
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}
