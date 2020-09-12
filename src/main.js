import TotalView from "./view/total.js";
import ProfilePresenter from "./presenter/profile.js";
import MovieListPresenter from "./presenter/movie-list.js";
import NavigationPresenter from "./presenter/navigation.js";
import MoviesModel from "./model/movies.js";
import CommentsModel from "./model/comments.js";
import FilterModel from "./model/filter.js";
import {render} from "./utils/render.js";
import {UpdateType} from "./const.js"
import Api from "./api.js";

const {INIT} = UpdateType;
const AUTHORIZATION = `Basic JMhmdCQVOVrLZrMXn`;
const SERVER_NAME = `https://12.ecmascript.pages.academy/cinemaddict`;

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);

const api = new Api(SERVER_NAME, AUTHORIZATION);

const moviesModel = new MoviesModel();
const commentsModel = new CommentsModel();
const filterModel = new FilterModel();

const profilePresenter = new ProfilePresenter(header, moviesModel);
const movieListPresenter = new MovieListPresenter(main, moviesModel, commentsModel, filterModel);
const navigationPresenter = new NavigationPresenter(main, filterModel, moviesModel, movieListPresenter);

profilePresenter.init();
movieListPresenter.init();
navigationPresenter.init();
render(footer.lastElementChild, new TotalView(moviesModel.getMovies()));

api.getMovies()
  .then((movies) => {
    moviesModel.setMovies(INIT, movies);
    return movies;
  })
  .then((movies) => {
    const allComments = {};
    movies.forEach((film) =>
      api.getComments(film.id).then((comments) => {
        allComments[film.id] = comments;
    }))
    return allComments;
  })
  .then((comments) => {
    console.log(comments);
    commentsModel.setComments(comments);
  })

//   .catch(() => {
//     moviesModel.setMovies(INIT, []);
//   });

















