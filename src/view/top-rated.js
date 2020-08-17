import AbstractView from "./abstract.js";

const createTopRatedMarkup = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      </section>`
  );
};

export default class TopRated extends AbstractView {
  getTemplate() {
    return createTopRatedMarkup();
  }
}
