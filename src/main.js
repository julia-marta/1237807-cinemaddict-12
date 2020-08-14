import ProfileView from "./view/profile.js";
import NavigationView from "./view/navigation.js";
import SortingView from "./view/sorting.js";
import FilmsView from "./view/films.js";
import AllMoviesView from "./view/all-movies.js";
import TopRatedView from "./view/top-rated.js";
import MostCommentedView from "./view/most-commented.js";
import FilmCardView from "./view/film-card.js";
import ShowButtonView from "./view/show-button.js";
import TotalView from "./view/total.js";
import PopUpView from "./view/pop-up.js";
import {RenderPosition, render, renderTemplate} from "./utils.js";
import {generateFilms, getTopRatedFilms, getMostCommentedFilms} from "./mock/film.js";
import {generateFilters} from "./mock/filter.js";
import {generateProfile} from "./mock/profile.js";

const {AFTERBEGIN} = RenderPosition;
const FILM_CARDS_COUNT = 20;
const FILM_EXTRA_COUNT = 2;
const FILM_CARDS_PER_STEP = 5;

const films = generateFilms(FILM_CARDS_COUNT);
const topRatedFilms = getTopRatedFilms(films, FILM_EXTRA_COUNT);
const mostCommentedFilms = getMostCommentedFilms(films, FILM_EXTRA_COUNT);
const filters = generateFilters(films);
const profile = generateProfile();
const total = films.length;

const body = document.querySelector(`body`);
const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);

render(header, new ProfileView(profile).getElement());
render(main, new NavigationView(filters).getElement(), AFTERBEGIN);
render(main, new SortingView().getElement());

const filmsComponent = new FilmsView();
const allMoviesComponent = new AllMoviesView();
const topRatedComponent = new TopRatedView();
const mostCommentedComponent = new MostCommentedView();

render(main, filmsComponent.getElement());
render(filmsComponent.getElement(), allMoviesComponent.getElement());
render(filmsComponent.getElement(), topRatedComponent.getElement());
render(filmsComponent.getElement(), mostCommentedComponent.getElement());

const renderFilmCard = (container, film) => {
  const filmCardComponent = new FilmCardView(film);
  const popUpComponent = new PopUpView(film);

  const onCloseButtonClick = (evt) => {
    evt.preventDefault();
    popUpComponent.getElement().remove();
    popUpComponent.removeElement();
  };

  const onFilmDetailsClick = (evt) => {
    evt.preventDefault();
    render(body, popUpComponent.getElement());

    popUpComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, onCloseButtonClick);
  };

  filmCardComponent.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, onFilmDetailsClick);
  filmCardComponent.getElement().querySelector(`.film-card__title`).addEventListener(`click`, onFilmDetailsClick);
  filmCardComponent.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, onFilmDetailsClick);

  render(container, filmCardComponent.getElement());
}

const renderFilmExtraCard = (films, component) => {
  return films.forEach((item) => {
    renderFilmCard(component, item)
  })
}

for (let i = 0; i < Math.min(films.length, FILM_CARDS_PER_STEP); i++) {
  renderFilmCard(allMoviesComponent.getElement().lastElementChild, films[i])
}

renderFilmExtraCard(topRatedFilms, topRatedComponent.getElement().lastElementChild)
renderFilmExtraCard(mostCommentedFilms, mostCommentedComponent.getElement().lastElementChild)

if (films.length > FILM_CARDS_PER_STEP) {
  let renderedFilmsCount = FILM_CARDS_PER_STEP;

  const showButtonComponent = new ShowButtonView();
  render(allMoviesComponent.getElement(), showButtonComponent.getElement());

  const onShowButtonClick = (evt) => {
    evt.preventDefault();
    films.slice(renderedFilmsCount, renderedFilmsCount + FILM_CARDS_PER_STEP)
    .forEach((film) => renderFilmCard(allMoviesComponent.getElement().querySelector(`.films-list__container`), film));

    renderedFilmsCount += FILM_CARDS_PER_STEP;

    if (renderedFilmsCount >= films.length) {
      showButtonComponent.getElement().remove();
      showButtonComponent.removeElement();
    }
  }

  showButtonComponent.getElement().addEventListener(`click`, onShowButtonClick);
};

render(footer.lastElementChild, new TotalView(total).getElement());
