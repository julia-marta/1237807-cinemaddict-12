import SortingView from "../view/sorting.js";
import FilmsView from "../view/films.js";
import NoMoviesView from "../view/no-movies.js";
import AllMoviesView from "../view/all-movies.js";
import TopRatedView from "../view/top-rated.js";
import MostCommentedView from "../view/most-commented.js";
import FilmsListView from "../view/films-list.js";
import FilmCardView from "../view/film-card.js";
import ShowButtonView from "../view/show-button.js";
import PopUpView from "../view/pop-up.js";
import {RenderPosition, render, remove} from "../utils/render.js";
import {sortByRating, sortByCommentsCount, sortByDate} from "../utils/sorting.js";
import {SortType} from "../const.js";

const {AFTERBEGIN} = RenderPosition;
const {DEFAULT, DATE, RATING} = SortType;
const FILM_EXTRA_COUNT = 2;
const FILM_CARDS_PER_STEP = 5;
const body = document.querySelector(`body`);

export default class MovieList {
  constructor(movieListContainer) {
    this._movieListContainer = movieListContainer;
    this._renderedFilmsCount = FILM_CARDS_PER_STEP;
    this._currentSortType = DEFAULT;
    this._sortingComponent = new SortingView();
    this._movieListComponent = new FilmsView();
    this._noMoviesComponent = new NoMoviesView();
    this._allMoviesComponent = new AllMoviesView();
    this._topRatedComponent = new TopRatedView();
    this._mostCommentedComponent = new MostCommentedView();
    this._allMoviesListComponent = new FilmsListView();
    this._topRatedListComponent = new FilmsListView();
    this._mostCommentedListComponent = new FilmsListView();
    this._showButtonComponent = new ShowButtonView();
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleShowButtonClick = this._handleShowButtonClick.bind(this);
  }

  init(films) {
    this._films = films.slice();
    this._defaultFilms = films.slice();
    this._topRatedFilms = sortByRating(this._films.slice());
    this._mostCommentedFilms = sortByCommentsCount(this._films.slice());
    this._renderSorting();
    render(this._movieListContainer, this._movieListComponent);
    this._renderMovieList();
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case DATE:
        sortByDate(this._films);
        break;
      case RATING:
        sortByRating(this._films);
        break;
      default:
        this._films = this._defaultFilms.slice();
    }
    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortFilms(sortType);
    this._clearAllMoviesList();
    this._renderAllMoviesList();
  }

  _renderSorting() {
    render(this._movieListContainer, this._sortingComponent);
    this._sortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilmCard(container, film) {
    const filmCardComponent = new FilmCardView(film);
    const popUpComponent = new PopUpView(film);

    const onClosePopUp = () => {
      remove(popUpComponent);
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        onClosePopUp();
      }
    };

    const onFilmDetailsClick = () => {
      render(body, popUpComponent);
      popUpComponent.setCloseButtonClickHandler(onClosePopUp);
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    filmCardComponent.setFilmDetailsClickHandler(onFilmDetailsClick);
    render(container, filmCardComponent);
  }

  _renderFilmCards(container, films, min, max) {
    films.slice(min, max)
    .forEach((film) => this._renderFilmCard(container, film));
  }

  _renderNoMovies() {
    render(this._movieListComponent, this._noMoviesComponent, AFTERBEGIN);
  }

  _clearAllMoviesList() {
    this._allMoviesListComponent.getElement().innerHTML = ``;
    this._renderedFilmsCount = FILM_CARDS_PER_STEP;
  }

  _renderAllMoviesList() {
    this._renderFilmCards(this._allMoviesListComponent, this._films, 0, Math.min(this._films.length, FILM_CARDS_PER_STEP));
    render(this._allMoviesComponent, this._allMoviesListComponent);

    if (this._films.length > FILM_CARDS_PER_STEP) {
      this._renderShowButton();
    }
  }

  _renderTopRatedList() {
    this._renderFilmCards(this._topRatedListComponent, this._topRatedFilms, 0, FILM_EXTRA_COUNT);
    render(this._topRatedComponent, this._topRatedListComponent);
  }

  _renderMostCommentedList() {
    this._renderFilmCards(this._mostCommentedListComponent, this._mostCommentedFilms, 0, FILM_EXTRA_COUNT);
    render(this._mostCommentedComponent, this._mostCommentedListComponent);
  }

  _handleShowButtonClick() {
    this._renderFilmCards(this._allMoviesListComponent, this._films, this._renderedFilmsCount, this._renderedFilmsCount + FILM_CARDS_PER_STEP);
    this._renderedFilmsCount += FILM_CARDS_PER_STEP;

    if (this._renderedFilmsCount >= this._films.length) {
      remove(this._showButtonComponent);
    }
  }

  _renderShowButton() {
    render(this._allMoviesComponent, this._showButtonComponent);
    this._showButtonComponent.setShowButtonClickHandler(this._handleShowButtonClick);
  }

  _renderAllMovies() {
    this._renderAllMoviesList();
    render(this._movieListComponent, this._allMoviesComponent);
  }

  _renderTopRated() {
    this._renderTopRatedList();
    render(this._movieListComponent, this._topRatedComponent);
  }

  _renderMostCommented() {
    this._renderMostCommentedList();
    render(this._movieListComponent, this._mostCommentedComponent);
  }

  _renderMovieList() {
    if (this._films.length === 0) {
      this._renderNoMovies();
      return;
    }

    this._renderAllMovies();
    this._renderTopRated();
    this._renderMostCommented();
  }
}
