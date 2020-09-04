import AbstractView from "./abstract.js";
import {SortType} from "../const.js";

const {DEFAULT, DATE, RATING} = SortType;

const createSortingMarkup = (currentSortType) => {
  return (
    `<ul class="sort">
    <li><a href="#" class="sort__button ${currentSortType === DEFAULT ? `sort__button--active` : ``}" data-sort-type="${DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button ${currentSortType === DATE ? `sort__button--active` : ``}" data-sort-type="${DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button ${currentSortType === RATING ? `sort__button--active` : ``}" data-sort-type="${RATING}">Sort by rating</a></li>
    </ul>`
  );
};

export default class Sorting extends AbstractView {
  constructor(currentSortType) {
    super();
    this._currentSortType = currentSortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortingMarkup(this._currentSortType);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}
