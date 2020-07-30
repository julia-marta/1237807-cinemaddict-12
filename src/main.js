import {createProfileMarkup} from "./view/profile.js";
import {createNavigationMarkup} from "./view/navigation.js";
import {createSortingMarkup} from "./view/sorting.js";
import {createFilmsMarkup} from "./view/films.js";
import {createFilmCardMarkup} from "./view/film-card.js";
import {createShowButtonMarkup} from "./view/show-button.js";
import {createStatisticsMarkup} from "./view/statistics.js";
import {createPopUpMarkup} from "./view/pop-up.js";

const FILM_CARDS_COUNT = 5;
const FILM_EXTRA_COUNT = 2;

const render = (container, markup, place = `beforeend`) => {
  container.insertAdjacentHTML(place, markup);
};

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);

render(header, createProfileMarkup());
render(main, createNavigationMarkup(), `afterbegin`);
render(main, createSortingMarkup());
render(main, createFilmsMarkup());

const films = main.querySelector(`.films`);
const filmsList = films.querySelector(`.films-list`);
const filmsContainers = films.querySelectorAll(`.films-list__container`);

Array.from(filmsContainers).forEach((item) => {
  for (let i = 0; i < (item.parentElement.classList.contains(`films-list--extra`) ? FILM_EXTRA_COUNT : FILM_CARDS_COUNT); i++) {
    render(item, createFilmCardMarkup());
  }
});

render(filmsList, createShowButtonMarkup());

const statistics = footer.querySelector(`.footer__statistics`);

render (statistics, createStatisticsMarkup());
render (footer, createPopUpMarkup(), `afterend`);
