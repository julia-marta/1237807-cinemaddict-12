import ProfileView from "./view/profile.js";
import NavigationView from "./view/navigation.js";
import SortingView from "./view/sorting.js";
import FilmsView from "./view/films.js";
import AllMoviesView from "./view/all-movies.js";
import NoMoviesView from "./view/no-movies.js";
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
const ESC_KEY = `Escape` || `Esc`;
const FILM_CARDS_COUNT = 20;
const FILM_EXTRA_COUNT = 2;
const FILM_CARDS_PER_STEP = 5;

const films = generateFilms(FILM_CARDS_COUNT);
const topRatedFilms = getTopRatedFilms(films);
const mostCommentedFilms = getMostCommentedFilms(films);
const filters = generateFilters(films);
const profile = generateProfile();
const total = films.length;

const body = document.querySelector(`body`);
const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);

const renderFilmCard = (container, film) => {
  const filmCardComponent = new FilmCardView(film);
  const popUpComponent = new PopUpView(film);

  const closePopUp = () => {
    popUpComponent.getElement().remove();
    popUpComponent.removeElement();
  }

  const onCloseButtonClick = (evt) => {
    evt.preventDefault();
    closePopUp();
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === ESC_KEY) {
      evt.preventDefault();
      closePopUp();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const onFilmDetailsClick = (evt) => {
    evt.preventDefault();
    render(body, popUpComponent.getElement());
    popUpComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, onCloseButtonClick);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  filmCardComponent.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, onFilmDetailsClick);
  filmCardComponent.getElement().querySelector(`.film-card__title`).addEventListener(`click`, onFilmDetailsClick);
  filmCardComponent.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, onFilmDetailsClick);

  render(container, filmCardComponent.getElement());
}

const renderFilms = (container, films) => {
  const filmsComponent = new FilmsView();
  const allMoviesComponent = new AllMoviesView();
  const topRatedComponent = new TopRatedView();
  const mostCommentedComponent = new MostCommentedView();

  const renderFilmCards = (container, films, min, max) => {
    films.slice(min, max)
    .forEach((film) => renderFilmCard(container, film))
  }

  render(container, filmsComponent.getElement());

  if (films.length === 0) {
    render(filmsComponent.getElement(), new NoMoviesView().getElement(), AFTERBEGIN);
    return;
  }

  render(filmsComponent.getElement(), allMoviesComponent.getElement());
  render(filmsComponent.getElement(), topRatedComponent.getElement());
  render(filmsComponent.getElement(), mostCommentedComponent.getElement());

  renderFilmCards(allMoviesComponent.getElement().lastElementChild, films, 0, Math.min(films.length, FILM_CARDS_PER_STEP));
  renderFilmCards(topRatedComponent.getElement().lastElementChild, topRatedFilms, 0, FILM_EXTRA_COUNT);
  renderFilmCards(mostCommentedComponent.getElement().lastElementChild, mostCommentedFilms, 0, FILM_EXTRA_COUNT);

  if (films.length > FILM_CARDS_PER_STEP) {
    let renderedFilmsCount = FILM_CARDS_PER_STEP;

    const showButtonComponent = new ShowButtonView();
    render(allMoviesComponent.getElement(), showButtonComponent.getElement());

    const onShowButtonClick = (evt) => {
      evt.preventDefault();
      renderFilmCards(allMoviesComponent.getElement().querySelector(`.films-list__container`), films, renderedFilmsCount, renderedFilmsCount + FILM_CARDS_PER_STEP);

      renderedFilmsCount += FILM_CARDS_PER_STEP;

      if (renderedFilmsCount >= films.length) {
        showButtonComponent.getElement().remove();
        showButtonComponent.removeElement();
      }
    }

    showButtonComponent.getElement().addEventListener(`click`, onShowButtonClick);
  };
}

render(header, new ProfileView(profile).getElement());
render(main, new NavigationView(filters).getElement(), AFTERBEGIN);
render(main, new SortingView().getElement());
renderFilms(main, films)
render(footer.lastElementChild, new TotalView(total).getElement());
