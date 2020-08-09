export const createFilmsMarkup = (films) => {
  return (
    `<section class="films">
    <section class="films-list">
    ${films.length > 0
      ? `<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container"></div>
      </section>

      <section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>

      <div class="films-list__container"></div>
      </section>

      <section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>

      <div class="films-list__container"></div>
      </section>`
      : `<h2 class="films-list__title">There are no movies in our database</h2>`}

  </section>`
  );
};
