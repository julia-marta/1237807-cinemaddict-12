import AbstractView from "./abstract.js";

const createFilmsMarkup = () => {
  return (
    `<section class="films"></section>`
  );
};

export default class Films extends AbstractView {
  getTemplate() {
    return createFilmsMarkup();
  }
}
