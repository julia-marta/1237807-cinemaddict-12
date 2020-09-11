import AbstractView from "./abstract.js";

const createTotalMarkup = (films) => {
  return (
    `<p>${films.length} movies inside</p>`
  );
};

export default class Total extends AbstractView {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createTotalMarkup(this._films);
  }
}
