import AbstractView from "./abstract.js";

export default class Smart extends AbstractView {
  constructor() {
    super();
    this._data = {};
  }

  updateData(newData) {
    if (!newData) {
      return;
    }

    this._data = Object.assign({}, this._data, newData);
    this.updateElement();
  }

  updateElement() {
    let prevElement = this.getElement();
    this.removeElement();
    const newElement = this.getElement();

    prevElement.replaceWith(newElement);
    prevElement = null;
    this.restoreHandlers();
    this.restoreComments();
  }

  restoreHandlers() {
    throw new Error(`Abstract method not implemented: restoreHandlers`);
  }

  restoreComments() {
    throw new Error(`Abstract method not implemented: restoreHandlers`);
  }
}
