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
import {SortType, FilmsType, UserAction, UpdateType} from "../const.js";

const {AFTERBEGIN} = RenderPosition;
const {DEFAULT, DATE, RATING} = SortType;
const {ALL, RATED, COMMENTED} = FilmsType;
const {UPDATE, ADD, DELETE} = UserAction;
const {MINOR, MAJOR} = UpdateType;
const FILM_EXTRA_COUNT = 2;
const FILM_CARDS_PER_STEP = 5;

export default class MovieList {
  constructor(movieListContainer, moviesModel, commentsModel) {
    this._moviesModel = moviesModel;
    this._commentsModel = commentsModel;
    this._movieListContainer = movieListContainer;
    this._renderedFilmsCount = FILM_CARDS_PER_STEP;
    this._currentSortType = DEFAULT;
    this._allFilmPresenter = {};
    this._ratedFilmPresenter = {};
    this._commentedFilmPresenter = {};

    this._showButtonComponent = null;
    this._sortingComponent = new SortingView();
    this._movieListComponent = new FilmsView();
    this._noMoviesComponent = new NoMoviesView();
    this._allMoviesComponent = new AllMoviesView();
    this._topRatedComponent = new TopRatedView();
    this._mostCommentedComponent = new MostCommentedView();
    this._allMoviesListComponent = new FilmsListView();
    this._topRatedListComponent = new FilmsListView();
    this._mostCommentedListComponent = new FilmsListView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleShowButtonClick = this._handleShowButtonClick.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderSorting();
    render(this._movieListContainer, this._movieListComponent);
    this._renderMovieList();
  }

  _getFilms() {
    switch (this._currentSortType) {
      case DATE:
        return sortByDate(this._moviesModel.getMovies().slice());
      case RATING:
        return sortByRating(this._moviesModel.getMovies().slice());
      default:
        return this._moviesModel.getMovies();
    }
  }

  _getTopRatedFilms() {
    return sortByRating(this._moviesModel.getMovies().slice());
  }

  _getMostCommentedFilms() {
    return sortByCommentsCount(this._moviesModel.getMovies().slice());
  }

  _handleModeChange() {
    Object.values(this._allFilmPresenter).forEach((presenter) => presenter.resetView());
    Object.values(this._ratedFilmPresenter).forEach((presenter) => presenter.resetView());
    Object.values(this._commentedFilmPresenter).forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updatedData, updateType, filmID) {
    switch (actionType) {
      case UPDATE:
        this._moviesModel.updateMovie(updatedData, updateType);
        break;
      case ADD:
        this._commentsModel.addComment(updatedData, filmID)
        break;
      case DELETE:
          this._commentsModel.deleteComment(updatedData, filmID)
        break;
    }
  }

  _handleModelEvent(updateType) {
    switch (updateType) {
      case MINOR:
        this._clearMovieList();
        this._renderMovieList();
        break;
      case MAJOR:
        this._clearMovieList({resetRenderedFilmsCount: true, resetSortType: true});
        this._renderMovieList();
        break;
    }
  }


  // _handleFilmCardChange(updatedFilm) {

  //   if (this._allFilmPresenter[updatedFilm.id]) {
  //     this._allFilmPresenter[updatedFilm.id].init(updatedFilm);
  //   }
  //   if (this._ratedFilmPresenter[updatedFilm.id]) {
  //     this._ratedFilmPresenter[updatedFilm.id].init(updatedFilm);
  //   }
  //   if (this._commentedFilmPresenter[updatedFilm.id]) {
  //     this._commentedFilmPresenter[updatedFilm.id].init(updatedFilm);
  //   }
  // }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;

    this._clearMovieList({resetAllMoviesOnly: true, resetRenderedFilmsCount: true})
    this._renderAllMoviesList();
  }

  _renderSorting() {
    render(this._movieListContainer, this._sortingComponent);
    this._sortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilmCard(container, film, type) {
    const filmPresenter = new FilmPresenter(container, this._handleViewAction, this._handleModeChange, this._commentsModel);
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

  _renderFilmCards(container, films, type) {
    films.forEach((film) => this._renderFilmCard(container, film, type));
  }

  _renderNoMovies() {
    render(this._movieListComponent, this._noMoviesComponent, AFTERBEGIN);
  }

  _renderAllMoviesList() {
    const films = this._getFilms();
    const filmsCount = films.length;
    const allFilms = films.slice(0, Math.min(filmsCount, this._renderedFilmsCount));

    this._renderFilmCards(this._allMoviesListComponent, allFilms, ALL);
    render(this._allMoviesComponent, this._allMoviesListComponent);

    if (filmsCount > this._renderedFilmsCount) {
      this._renderShowButton();
    }
  }

  _renderTopRatedList() {
    const topRatedFilms = this._getTopRatedFilms().slice(0, FILM_EXTRA_COUNT);
    this._renderFilmCards(this._topRatedListComponent, topRatedFilms, RATED);
    render(this._topRatedComponent, this._topRatedListComponent);
  }

  _renderMostCommentedList() {
    const mostCommentedFilms = this._getMostCommentedFilms().slice(0, FILM_EXTRA_COUNT);
    this._renderFilmCards(this._mostCommentedListComponent, mostCommentedFilms, COMMENTED);
    render(this._mostCommentedComponent, this._mostCommentedListComponent);
  }

  _handleShowButtonClick() {
    const filmsCount = this._getFilms().length;
    const newRenderedFilmsCount = Math.min(filmsCount, this._renderedFilmsCount + FILM_CARDS_PER_STEP);
    const addFilmsCount =  this._getFilms().slice(this._renderedFilmsCount, newRenderedFilmsCount);


    this._renderFilmCards(this._allMoviesListComponent, addFilmsCount, ALL);
    this._renderedFilmsCount = newRenderedFilmsCount;

    if (this._renderedFilmsCount >= filmsCount) {
      remove(this._showButtonComponent);
    }
  }

  _renderShowButton() {
    if (this._showButtonComponent !== null) {
      this._showButtonComponent = null;
    }

    this._showButtonComponent = new ShowButtonView();
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

  _clearMovieList({resetAllMoviesOnly = false, resetRenderedFilmsCount = false, resetSortType = false} = {}) {

    Object.values(this._allFilmPresenter).forEach((presenter) => presenter.destroy());
    this._allFilmPresenter = {};

    if (resetRenderedFilmsCount) {
      this._renderedFilmsCount = FILM_CARDS_PER_STEP;
    }

    remove(this._showButtonComponent);

    if (resetAllMoviesOnly) {
      return;
    }

    Object.values(this._ratedFilmPresenter).forEach((presenter) => presenter.destroy());
    Object.values(this._commentedFilmPresenter).forEach((presenter) => presenter.destroy());

    this._ratedFilmPresenter = {};
    this._commentedFilmPresenter = {};

    remove(this._noMoviesComponent);

    if (resetSortType) {
      this._currentSortType = DEFAULT;
    }
  }

  _renderMovieList() {
    const filmsCount = this._getFilms().length;

    if (filmsCount === 0) {
      this._renderNoMovies();
      return;
    }

    this._renderAllMovies();
    this._renderTopRated();
    this._renderMostCommented();
  }
}
