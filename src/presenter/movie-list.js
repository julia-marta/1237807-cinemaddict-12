import FilmPresenter from "./film.js";
import SortingView from "../view/sorting.js";
import FilmsView from "../view/films.js";
import NoMoviesView from "../view/no-movies.js";
import AllMoviesView from "../view/all-movies.js";
import TopRatedView from "../view/top-rated.js";
import MostCommentedView from "../view/most-commented.js";
import FilmsListView from "../view/films-list.js";
import ShowButtonView from "../view/show-button.js";
import {RenderPosition, render, remove} from "../utils/render.js";
import {sortByRating, sortByCommentsCount, sortByDate} from "../utils/sorting.js";
import {updateItem} from "../utils/common.js";
import {SortType, FilmsType} from "../const.js";

const {AFTERBEGIN} = RenderPosition;
const {DEFAULT, DATE, RATING} = SortType;
const {ALL, RATED, COMMENTED} = FilmsType;
const FILM_EXTRA_COUNT = 2;
const FILM_CARDS_PER_STEP = 5;

export default class MovieList {
  constructor(movieListContainer) {
    this._movieListContainer = movieListContainer;
    this._renderedFilmsCount = FILM_CARDS_PER_STEP;
    this._currentSortType = DEFAULT;
    this._allFilmPresenter = {};
    this._ratedFilmPresenter = {};
    this._commentedFilmPresenter = {};

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

    this._handleFilmCardChange = this._handleFilmCardChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleShowButtonClick = this._handleShowButtonClick.bind(this);
  }

  init(films) {
    this._films = films.slice();
    this._defaultFilms = films.slice();
    this._topRatedFilms = sortByRating(films.slice());
    this._mostCommentedFilms = sortByCommentsCount(films.slice());
    this._renderSorting();
    render(this._movieListContainer, this._movieListComponent);
    this._renderMovieList();
  }

  _handleModeChange() {
    Object.values(this._allFilmPresenter).forEach((presenter) => presenter.resetView());
    Object.values(this._ratedFilmPresenter).forEach((presenter) => presenter.resetView());
    Object.values(this._commentedFilmPresenter).forEach((presenter) => presenter.resetView());
  }

  _handleFilmCardChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
    this._defaultFilms = updateItem(this._defaultFilms, updatedFilm);
    if (this._allFilmPresenter[updatedFilm.id]) {
      this._allFilmPresenter[updatedFilm.id].init(updatedFilm);
    }
    if (this._ratedFilmPresenter[updatedFilm.id]) {
      this._ratedFilmPresenter[updatedFilm.id].init(updatedFilm);
    }
    if (this._commentedFilmPresenter[updatedFilm.id]) {
      this._commentedFilmPresenter[updatedFilm.id].init(updatedFilm);
    }
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

  _renderFilmCard(container, film, type) {
    const filmPresenter = new FilmPresenter(container, this._handleFilmCardChange, this._handleModeChange);
    filmPresenter.init(film);
    switch (type) {
      case ALL:
        this._allFilmPresenter[film.id] = filmPresenter;
        break;
      case RATED:
        this._ratedFilmPresenter[film.id] = filmPresenter;
        break;
      case COMMENTED:
        this._commentedFilmPresenter[film.id] = filmPresenter;
        break;
    }
  }

  _renderFilmCards(container, films, min, max, type) {
    films.slice(min, max)
    .forEach((film) => this._renderFilmCard(container, film, type));
  }

  _renderNoMovies() {
    render(this._movieListComponent, this._noMoviesComponent, AFTERBEGIN);
  }

  _clearAllMoviesList() {
    Object.values(this._allFilmPresenter).forEach((presenter) => presenter.destroy());
    this._renderedFilmsCount = FILM_CARDS_PER_STEP;
  }

  _renderAllMoviesList() {
    this._renderFilmCards(this._allMoviesListComponent, this._films, 0, Math.min(this._films.length, FILM_CARDS_PER_STEP), ALL);
    render(this._allMoviesComponent, this._allMoviesListComponent);

    if (this._films.length > FILM_CARDS_PER_STEP) {
      this._renderShowButton();
    }
  }

  _renderTopRatedList() {
    this._renderFilmCards(this._topRatedListComponent, this._topRatedFilms, 0, FILM_EXTRA_COUNT, RATED);
    render(this._topRatedComponent, this._topRatedListComponent);
  }

  _renderMostCommentedList() {
    this._renderFilmCards(this._mostCommentedListComponent, this._mostCommentedFilms, 0, FILM_EXTRA_COUNT, COMMENTED);
    render(this._mostCommentedComponent, this._mostCommentedListComponent);
  }

  _handleShowButtonClick() {
    this._renderFilmCards(this._allMoviesListComponent, this._films, this._renderedFilmsCount, this._renderedFilmsCount + FILM_CARDS_PER_STEP, ALL);
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
