import AbstractView from "./abstract.js";

const createTotalMarkup = (total) => {
  return (
    `<p>${total} movies inside</p>`
  );
};

export default class Total extends AbstractView {
  constructor(total) {
    super();
    this._total = total;
  }

  getTemplate() {
    return createTotalMarkup(this._total);
  }
}
