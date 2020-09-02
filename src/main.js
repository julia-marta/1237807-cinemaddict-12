import ProfileView from "./view/profile.js";
import NavigationView from "./view/navigation.js";
import TotalView from "./view/total.js";
import MovieListPresenter from "./presenter/movie-list.js";
import MoviesModel from "./model/movies.js";
import CommentsModel from "./model/comments.js";
import {RenderPosition, render} from "./utils/render.js";
import {generateFilms} from "./mock/film.js";
import {generateFilters} from "./mock/filter.js";
import {generateProfile} from "./mock/profile.js";

const {AFTERBEGIN} = RenderPosition;
const FILM_CARDS_COUNT = 20;

const films = generateFilms(FILM_CARDS_COUNT);
const filters = generateFilters(films);
const profile = generateProfile();
const total = films.length;

const moviesModel = new MoviesModel();
moviesModel.setMovies(films);
const commentsModel = new CommentsModel();
commentsModel.setComments(films);

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const movieListPresenter = new MovieListPresenter(main, moviesModel, commentsModel);
const footer = document.querySelector(`.footer`);

render(header, new ProfileView(profile));
render(main, new NavigationView(filters), AFTERBEGIN);
movieListPresenter.init();
render(footer.lastElementChild, new TotalView(total));
