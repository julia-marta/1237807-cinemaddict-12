import AbstractView from "./abstract.js";

const createFilmsListMarkup = () => {
  return (
    `<div class="films-list__container"></div>`
  );
};

export default class FilmsList extends AbstractView {
  getTemplate() {
    return createFilmsListMarkup();
  }
}
