import {createProfileMarkup} from "./view/profile.js";
import {createNavigationMarkup} from "./view/navigation.js";
import {createSortingMarkup} from "./view/sorting.js";
import {createFilmsMarkup} from "./view/films.js";
import {createFilmCardMarkup} from "./view/film-card.js";
import {createShowButtonMarkup} from "./view/show-button.js";
import {createStatisticsMarkup} from "./view/statistics.js";
import {createPopUpMarkup} from "./view/pop-up.js";
import {generateFilms} from "./mock/film.js";
import {generateFilters} from "./mock/filter.js";
import {generateProfile} from "./mock/profile.js";

const FILM_CARDS_COUNT = 20;
const FILM_EXTRA_COUNT = 2;
const FILM_CARDS_PER_STEP = 5;

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
const filters = generateFilters(films);
const profile = generateProfile();
const total = films.length;

const render = (container, markup, place = `beforeend`) => {
  container.insertAdjacentHTML(place, markup);
};

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);

render(header, createProfileMarkup(profile));
render(main, createNavigationMarkup(filters), `afterbegin`);
render(main, createSortingMarkup());
render(main, createFilmsMarkup(films));

const filmsSection = main.querySelector(`.films`);
const filmsList = filmsSection.querySelector(`.films-list`);
const filmsContainers = filmsSection.querySelectorAll(`.films-list__container`);

const renderFilmCard = (container, film) => {
  render(container, createFilmCardMarkup(film));
}

const renderCards = (count, container, films) => {
  for (let i = 0; i < count; i++) {
    renderFilmCard(container, films[i])
  }
}

Array.from(filmsContainers).forEach((item) => {
  if (item.parentElement.children[0].textContent === `Top rated`) {
    renderCards(FILM_EXTRA_COUNT, item, topRatedFilms);
  } else if (item.parentElement.children[0].textContent === `Most commented`) {
    renderCards(FILM_EXTRA_COUNT, item, mostCommentedFilms);
  } else {
    renderCards(Math.min(films.length, FILM_CARDS_PER_STEP), item, films);

    if (films.length > FILM_CARDS_PER_STEP) {
      let renderedFilmsCount = FILM_CARDS_PER_STEP;
      render(filmsList, createShowButtonMarkup());

      const showMoreButton = filmsList.querySelector(`.films-list__show-more`);

      const onShowMoreButtonClick = (evt) => {
        evt.preventDefault();
        films.slice(renderedFilmsCount, renderedFilmsCount + FILM_CARDS_PER_STEP).forEach((film) => renderFilmCard(item, film));

        renderedFilmsCount += FILM_CARDS_PER_STEP;

        if (renderedFilmsCount >= films.length) {
          showMoreButton.remove();
        }
      }

      showMoreButton.addEventListener(`click`, onShowMoreButtonClick);
    };
  }
});

const footer = document.querySelector(`.footer`);
const statistics = footer.querySelector(`.footer__statistics`);

render (statistics, createStatisticsMarkup(total));
render (footer, createPopUpMarkup(films[0]), `afterend`);
