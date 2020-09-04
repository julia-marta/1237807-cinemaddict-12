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

  updateMovie(updateType, updatedFilm) {
    const index = this._movies.findIndex((film) => film.id === updatedFilm.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting film`);
    }

    this._movies = [...this._movies.slice(0, index), updatedFilm, ...this._movies.slice(index + 1)];
    this._notify(updateType, updatedFilm);
  }

  // addComment(updateType, updatedFilm, newComment) {
  //   const index = this._movies.findIndex((film) => film.id === updatedFilm.id);

  //   if (index === -1) {
  //     throw new Error(`Can't add comment to unexisting film`);
  //   }

  //   this._movies[index].comments = [...this._movies[index].comments, newComment];
  //   this._notify(updateType, updatedFilm);
  // }

  // deleteComment(updateType, updatedFilm, deletedComment) {
  //   const index = this._movies.findIndex((film) => film.id === updatedFilm.id);

  //   if (index === -1) {
  //     throw new Error(`Can't delete comment to unexisting film`);
  //   }

  //   const commentIndex = this._movies[index].comments.findIndex((comment) => comment.id === deletedComment.id);

  //   if (index === -1) {
  //     throw new Error(`Can't delete unexisting comment`);
  //   }

  //   this._movies[index].comments = [...this._movies[index].comments.slice(0, commentIndex), ...this._movies[index].comments.slice(commentIndex + 1)];
  //   this._notify(updateType);
  // }
}