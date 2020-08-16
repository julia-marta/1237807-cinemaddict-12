import AbstractView from "./abstract.js";

const createAllMoviesMarkup = () => {
  return (
    `<section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      </section>`
  );
};

export default class AllMovies extends AbstractView {
  getTemplate() {
    return createAllMoviesMarkup();
  }
}
