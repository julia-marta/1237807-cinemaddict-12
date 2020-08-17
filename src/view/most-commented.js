import AbstractView from "./abstract.js";

const createMostCommentedMarkup = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      </section>`
  );
};

export default class MostCommented extends AbstractView {
  getTemplate() {
    return createMostCommentedMarkup();
  }
}
