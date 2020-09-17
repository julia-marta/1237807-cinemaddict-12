import TotalView from "./view/total.js";
import ProfilePresenter from "./presenter/profile.js";
import MovieListPresenter from "./presenter/movie-list.js";
import NavigationPresenter from "./presenter/navigation.js";
import MoviesModel from "./model/movies.js";
import CommentsModel from "./model/comments.js";
import FilterModel from "./model/filter.js";
import {render} from "./utils/render.js";
import {UpdateType} from "./const.js"
import Api from "./api/index.js";
import Store from "./api/store.js";
import Provider from "./api/provider.js";

const {INIT} = UpdateType;
const AUTHORIZATION = `Basic JMhmdCQVOVrLZrMXn`;
const SERVER_NAME = `https://12.ecmascript.pages.academy/cinemaddict`;
const STORE_PREFIX = `cinemaddict-localstorage`;
const STORE_VERSION = `v12`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VERSION}`;

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);

const api = new Api(SERVER_NAME, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const moviesModel = new MoviesModel();
const commentsModel = new CommentsModel();
const filterModel = new FilterModel();

const profilePresenter = new ProfilePresenter(header, moviesModel);
const movieListPresenter = new MovieListPresenter(main, moviesModel, commentsModel, filterModel, apiWithProvider, api);
const navigationPresenter = new NavigationPresenter(main, filterModel, moviesModel, movieListPresenter);

movieListPresenter.init();
navigationPresenter.init();

  let films=[];
  apiWithProvider.getMovies()
  .then((movies) => {
    films = movies
    return movies;
  })
  .then((movies) => movies.map((film) => api.getComments(film.id)))
  .then((comments) => Promise.all(comments))
  .then((allcomments) => {
    commentsModel.setComments(allcomments);
    moviesModel.setMovies(INIT, films);
    profilePresenter.init();
    render(footer.lastElementChild, new TotalView(moviesModel.getMovies()));
  })
  .catch(() => {
    commentsModel.setComments([]);
    moviesModel.setMovies(INIT, []);
    profilePresenter.init();
    render(footer.lastElementChild, new TotalView(moviesModel.getMovies()));
  });

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`../sw.js`)
    .then(() => {
      console.log(`ServiceWorker available`);
    }).catch(() => {
      console.error(`ServiceWorker isn't available`);
    });
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
