import ProfileView from "./view/profile.js";
import NavigationView from "./view/navigation.js";
import TotalView from "./view/total.js";
import MovieListPresenter from "./presenter/movie-list.js";
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

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const movieListPresenter = new MovieListPresenter(main);
const footer = document.querySelector(`.footer`);

render(header, new ProfileView(profile));
render(main, new NavigationView(filters), AFTERBEGIN);
movieListPresenter.init(films);
render(footer.lastElementChild, new TotalView(total));
