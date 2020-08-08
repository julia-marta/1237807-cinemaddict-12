import {createProfileMarkup} from "./view/profile.js";
import {createNavigationMarkup} from "./view/navigation.js";
import {createSortingMarkup} from "./view/sorting.js";
import {createFilmsMarkup} from "./view/films.js";
import {createFilmCardMarkup} from "./view/film-card.js";
import {createShowButtonMarkup} from "./view/show-button.js";
import {createStatisticsMarkup} from "./view/statistics.js";
import {createPopUpMarkup} from "./view/pop-up.js";
import {generateFilms} from "./mock/film.js";

const FILM_CARDS_COUNT = 10;
const FILM_EXTRA_COUNT = 2;

const getTopRatedFilms = (films) => {
  return films.sort((a, b) => {
    return b.rating - a.rating;
  }).slice(0, FILM_EXTRA_COUNT);
}

const getMostCommentedFilms = (films) => {
  return films.sort((a, b) => {
    return b.comments.length - a.comments.length;
  }).slice(0, FILM_EXTRA_COUNT);
}

const films = generateFilms(FILM_CARDS_COUNT);
const topRatedFilms = getTopRatedFilms(films);
const mostCommentedFilms = getMostCommentedFilms(films);

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

const filmsSection = main.querySelector(`.films`);
const filmsList = filmsSection.querySelector(`.films-list`);
const filmsContainers = filmsSection.querySelectorAll(`.films-list__container`);

const renderFilmCard = (count, container, films) => {
  for (let i = 0; i < count; i++) {
    render(container, createFilmCardMarkup(films[i]));
  }
}

Array.from(filmsContainers).forEach((item) => {
  if (item.parentElement.children[0].textContent === `Top rated`) {
    renderFilmCard(FILM_EXTRA_COUNT, item, topRatedFilms);
  } else if (item.parentElement.children[0].textContent === `Most commented`) {
    renderFilmCard(FILM_EXTRA_COUNT, item, mostCommentedFilms);
  } else {
    renderFilmCard(FILM_CARDS_COUNT, item, films);
  }
});

render(filmsList, createShowButtonMarkup());

const statistics = footer.querySelector(`.footer__statistics`);

render (statistics, createStatisticsMarkup());
// render (footer, createPopUpMarkup(), `afterend`);

