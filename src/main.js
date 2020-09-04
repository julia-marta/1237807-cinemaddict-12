import ProfileView from "./view/profile.js";
import TotalView from "./view/total.js";
import MovieListPresenter from "./presenter/movie-list.js";
import NavigationPresenter from "./presenter/navigation.js";
import MoviesModel from "./model/movies.js";
import CommentsModel from "./model/comments.js";
import FilterModel from "./model/filter.js";
import {render} from "./utils/render.js";
import {generateFilms} from "./mock/film.js";
import {generateProfile} from "./mock/profile.js";


const FILM_CARDS_COUNT = 20;

const films = generateFilms(FILM_CARDS_COUNT);
const profile = generateProfile();
const total = films.length;

const moviesModel = new MoviesModel();
moviesModel.setMovies(films);
const commentsModel = new CommentsModel();
commentsModel.setComments(films);
const filterModel = new FilterModel();

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);

const movieListPresenter = new MovieListPresenter(main, moviesModel, commentsModel, filterModel);
const navigationPresenter = new NavigationPresenter(main, filterModel, moviesModel);

render(header, new ProfileView(profile));
movieListPresenter.init();
navigationPresenter.init();
render(footer.lastElementChild, new TotalView(total));
