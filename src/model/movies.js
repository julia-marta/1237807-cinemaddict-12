import Observer from "../utils/observer.js";

export default class Movies extends Observer {
  constructor() {
    super();
    this._movies = [];
  }

  setMovies(films) {
    this._movies = films.slice();
  }

  getMovies() {
    return this._movies;
  }

  getWatchedMovies() {
    return this._movies.filter((movie) => movie.isWatched);
  }

  updateMovie(updateType, updatedFilm) {
    const index = this._movies.findIndex((film) => film.id === updatedFilm.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting film`);
    }

    this._movies = [...this._movies.slice(0, index), updatedFilm, ...this._movies.slice(index + 1)];
    this._notify(updateType, updatedFilm);
  }

  addComment(updateType, newComment, filmID) {
    const index = this._movies.findIndex((film) => film.id === filmID);

    if (index === -1) {
      throw new Error(`Can't add comment to unexisting film`);
    }

    this._movies[index].comments = [...this._movies[index].comments, newComment];
    this.updateMovie(updateType, this._movies[index]);
  }

  deleteComment(updateType, deletedComment, filmID) {
    const index = this._movies.findIndex((film) => film.id === filmID);

    if (index === -1) {
      throw new Error(`Can't delete comment to unexisting film`);
    }

    this._movies[index].comments = this._movies[index].comments.filter((comment) => comment.id !== deletedComment.id);
    this.updateMovie(updateType, this._movies[index]);
  }
}
