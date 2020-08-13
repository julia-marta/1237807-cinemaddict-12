import {createElement} from "../utils.js";

const createTotalMarkup = (total) => {
  return (
    `<p>${total} movies inside</p>`
  );
};

export default class Total {
  constructor(total) {
    this._total = total;
    this._element = null;
  }

  getTemplate() {
    return createTotalMarkup(this._total);
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
