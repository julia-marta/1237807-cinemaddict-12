import FilmPresenter from "./film.js";
import SortingView from "../view/sorting.js";
import FilmsView from "../view/films.js";
import LoadingView from "../view/loading.js";
import NoMoviesView from "../view/no-movies.js";
import AllMoviesView from "../view/all-movies.js";
import TopRatedView from "../view/top-rated.js";
import MostCommentedView from "../view/most-commented.js";
import FilmsListView from "../view/films-list.js";
import ShowButtonView from "../view/show-button.js";
import {RenderPosition, render, remove} from "../utils/render.js";
import {filterRules} from "../utils/filter.js";
import {sortByRating, sortByCommentsCount, sortByDate} from "../utils/sorting.js";
import {SortType, FilmsType, UserAction, UpdateType} from "../const.js";

const {AFTERBEGIN, BEFORE} = RenderPosition;
const {DEFAULT, DATE, RATING} = SortType;
const {ALL, RATED, COMMENTED} = FilmsType;
const {ADD, DELETE} = UserAction;
const {PATCH, MINOR, MAJOR, INIT} = UpdateType;
const FILM_EXTRA_COUNT = 2;
const FILM_CARDS_PER_STEP = 5;

export default class MovieList {
  constructor({movieListContainer, moviesModel, commentsModel, filterModel, apiWithProvider, api} = {}) {
    this._moviesModel = moviesModel;
    this._commentsModel = commentsModel;
    this._filterModel = filterModel;
    this._movieListContainer = movieListContainer;
    this._renderedFilmsCount = FILM_CARDS_PER_STEP;
    this._currentSortType = DEFAULT;
    this._allFilmPresenter = {};
    this._ratedFilmPresenter = {};
    this._commentedFilmPresenter = {};
    this._isLoading = true;
    this._apiWithProvider = apiWithProvider;
    this._api = api;

    this._sortingComponent = null;
    this._showButtonComponent = null;

    this._sortingComponent = new SortingView();
    this._movieListComponent = new FilmsView();
    this._noMoviesComponent = new NoMoviesView();
    this._loadingComponent = new LoadingView();
    this._allMoviesComponent = new AllMoviesView();
    this._topRatedComponent = new TopRatedView();
    this._mostCommentedComponent = new MostCommentedView();
    this._allMoviesListComponent = new FilmsListView();
    this._topRatedListComponent = new FilmsListView();
    this._mostCommentedListComponent = new FilmsListView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleCommentsViewAction = this._handleCommentsViewAction.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleShowButtonClick = this._handleShowButtonClick.bind(this);
  }

  init() {
    render(this._movieListContainer, this._movieListComponent);
    this._renderMovieList();

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  destroy() {
    this._clearMovieList({resetRenderedFilmsCount: true, resetSortType: true});
    remove(this._movieListComponent);
    this._moviesModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  _getFilms() {
    const currentFilter = this._filterModel.getFilter();
    const films = this._moviesModel.getMovies();

    const filteredFilms = films.filter((film) => filterRules[currentFilter](film));

    switch (this._currentSortType) {
      case DATE:
        return sortByDate(filteredFilms.slice());
      case RATING:
        return sortByRating(filteredFilms.slice());
      default:
        return filteredFilms;
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

  _handleViewAction(updateType, updatedData, isPopUp) {
    this._apiWithProvider.updateMovie(updatedData).then((response) => {
      this._moviesModel.updateMovie(updateType, response);
    })
    .catch(() => {
      if (this._allFilmPresenter[updatedData.id]) {
        this._allFilmPresenter[updatedData.id].setUpdateAborting(isPopUp);
      }
      if (this._ratedFilmPresenter[updatedData.id]) {
        this._ratedFilmPresenter[updatedData.id].setUpdateAborting(isPopUp);
      }
      if (this._commentedFilmPresenter[updatedData.id]) {
        this._commentedFilmPresenter[updatedData.id].setUpdateAborting(isPopUp);
      }
    });
  }

  _handleModelEvent(updateType, updatedFilm) {
    switch (updateType) {
      case PATCH:
        if (this._allFilmPresenter[updatedFilm.id]) {
          this._allFilmPresenter[updatedFilm.id].init(updatedFilm);
        }
        if (this._ratedFilmPresenter[updatedFilm.id]) {
          this._ratedFilmPresenter[updatedFilm.id].init(updatedFilm);
        }
        if (this._commentedFilmPresenter[updatedFilm.id]) {
          this._commentedFilmPresenter[updatedFilm.id].init(updatedFilm);
        }
        break;
      case MINOR:
        this._clearMovieList();
        this._renderMovieList();
        break;
      case MAJOR:
        this._clearMovieList({resetRenderedFilmsCount: true, resetSortType: true});
        this._renderMovieList();
        break;
      case INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderMovieList();
        break;
    }
  }

  _handleCommentsViewAction(actionType, updatedData, filmID) {
    switch (actionType) {
      case ADD:
        if (this._allFilmPresenter[filmID]) {
          this._allFilmPresenter[filmID].setSaving();
        }
        if (this._ratedFilmPresenter[filmID]) {
          this._ratedFilmPresenter[filmID].setSaving();
        }
        if (this._commentedFilmPresenter[filmID]) {
          this._commentedFilmPresenter[filmID].setSaving();
        }
        this._api.addComment(updatedData, filmID).then((response) => {
          this._commentsModel.addComment(response, filmID);
          this._moviesModel.addComment(PATCH, response, filmID);
        })
        .catch(() => {
          if (this._allFilmPresenter[filmID]) {
            this._allFilmPresenter[filmID].setAborting();
          }
          if (this._ratedFilmPresenter[filmID]) {
            this._ratedFilmPresenter[filmID].setAborting();
          }
          if (this._commentedFilmPresenter[filmID]) {
            this._commentedFilmPresenter[filmID].setAborting();
          }
        });
        break;
      case DELETE:
        if (this._allFilmPresenter[filmID]) {
          this._allFilmPresenter[filmID].setCommentDeleting(updatedData.id);
        }
        if (this._ratedFilmPresenter[filmID]) {
          this._ratedFilmPresenter[filmID].setCommentDeleting(updatedData.id);
        }
        if (this._commentedFilmPresenter[filmID]) {
          this._commentedFilmPresenter[filmID].setCommentDeleting(updatedData.id);
        }
        this._api.deleteComment(updatedData).then(() => {
          this._commentsModel.deleteComment(updatedData, filmID);
          this._moviesModel.deleteComment(PATCH, updatedData, filmID);
        })
        .catch(() => {
          if (this._allFilmPresenter[filmID]) {
            this._allFilmPresenter[filmID].setCommentAborting(updatedData.id);
          }
          if (this._ratedFilmPresenter[filmID]) {
            this._ratedFilmPresenter[filmID].setCommentAborting(updatedData.id);
          }
          if (this._commentedFilmPresenter[filmID]) {
            this._commentedFilmPresenter[filmID].setCommentAborting(updatedData.id);
          }
        });
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;

    this._clearMovieList({resetAllMoviesOnly: true, resetRenderedFilmsCount: true});
    this._renderSorting();
    this._renderAllMoviesList();
  }

  _renderSorting() {
    if (this._sortingComponent !== null) {
      this._sortingComponent = null;
    }

    this._sortingComponent = new SortingView(this._currentSortType);
    this._sortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._movieListContainer, this._sortingComponent, BEFORE, this._movieListComponent);
  }

  _renderFilmCard(container, film, type) {
    const filmPresenter = new FilmPresenter(container, this._handleViewAction, this._handleCommentsViewAction, this._handleModeChange, this._commentsModel);

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

  _renderLoading() {
    render(this._movieListComponent, this._loadingComponent, AFTERBEGIN);
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
    const addFilmsCount = this._getFilms().slice(this._renderedFilmsCount, newRenderedFilmsCount);


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

    remove(this._sortingComponent);
    remove(this._showButtonComponent);

    if (resetAllMoviesOnly) {
      return;
    }

    Object.values(this._ratedFilmPresenter).forEach((presenter) => presenter.destroy());
    Object.values(this._commentedFilmPresenter).forEach((presenter) => presenter.destroy());

    this._ratedFilmPresenter = {};
    this._commentedFilmPresenter = {};

    remove(this._noMoviesComponent);
    remove(this._loadingComponent);

    if (resetSortType) {
      this._currentSortType = DEFAULT;
    }
  }

  _renderMovieList() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const filmsCount = this._getFilms().length;

    if (filmsCount === 0) {
      this._renderNoMovies();
      return;
    }
    this._renderSorting();
    this._renderAllMovies();

    const isAllRaitingsNull = this._getFilms().every((film) => {
      return film.rating === 0;
    });
    const isAllCommentsNull = this._getFilms().every((film) => {
      return film.comments.length === 0;
    });

    if (!isAllRaitingsNull) {
      this._renderTopRated();
    }

    if (!isAllCommentsNull) {
      this._renderMostCommented();
    }
  }
}
