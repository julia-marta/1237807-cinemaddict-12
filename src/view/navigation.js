import AbstractView from "./abstract.js";
import {MenuItem} from "../const.js";
const {ALL, WATCHLIST, HISTORY, FAVORITES, STATS} = MenuItem;

const createNavigationMarkup = (filters, currentMenuItem) => {
  const {watchlist, history, favorites} = filters;
  return (
    `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item ${currentMenuItem === ALL ? ` main-navigation__item--active` : ``}">All movies</a>
      <a href="#watchlist" class="main-navigation__item ${currentMenuItem === WATCHLIST ? ` main-navigation__item--active` : ``}">Watchlist <span class="main-navigation__item-count">${watchlist}</span></a>
      <a href="#history" class="main-navigation__item ${currentMenuItem === HISTORY ? ` main-navigation__item--active` : ``}">History <span class="main-navigation__item-count">${history}</span></a>
      <a href="#favorites" class="main-navigation__item ${currentMenuItem === FAVORITES ? ` main-navigation__item--active` : ``}">Favorites <span class="main-navigation__item-count">${favorites}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional ${currentMenuItem === STATS ? ` main-navigation__item--active` : ``}">Stats</a>
    </nav>`
  );
};

export default class Navigation extends AbstractView {
  constructor(filters, currentMenuItem) {
    super();
    this._filters = filters;
    this._currentMenuItem = currentMenuItem;

    this._menuChangeHandler = this._menuChangeHandler.bind(this);
  }

  getTemplate() {
    return createNavigationMarkup(this._filters, this._currentMenuItem);
  }


  _menuChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }
    evt.preventDefault();
    this._callback.menuChange(evt.target.hash);
  }

  setMenuChangeHandler(callback) {
    this._callback.menuChange = callback;
    this.getElement().addEventListener(`click`, this._menuChangeHandler);
  }
}
