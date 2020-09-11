import moment from "moment";
import 'moment-duration-format';
import SmartView from "./smart.js";
import {Range, getFilmsInRange, getTotalDuration, getGenresCount, getTopGenre} from "../utils/statistics.js";
import {getRank} from "../utils/profile.js";

const {ALLTIME} = Range;

const createStatisticFiltersMarkup = (currentRange) => {

  return Object.values(Range).map((range) =>
    `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${range.value}" value="${range.value}" ${range.value === currentRange ? `checked` : ``}>
    <label for="statistic-${range.value}" class="statistic__filters-label">${range.label}</label>`).join(``);
};


const createStatisticsMarkup = (data) => {
  const {films, currentRange} = data;

  const statisticFiltersMarkup = createStatisticFiltersMarkup(currentRange);
  const rank = films.length !== 0 ? getRank(films.length) : ``;
  const filmsInRange = films.length !== 0 ? getFilmsInRange(films, currentRange) : [];
  const totalDuration = filmsInRange.length !== 0 ? getTotalDuration(filmsInRange) : 0;
  const totalHours = totalDuration !== 0 ? moment.duration(totalDuration, `minutes`).hours() : 0;
  const totalMinutes = totalDuration !== 0 ? moment.duration(totalDuration, `minutes`).minutes() : 0;
  const genresCount = filmsInRange.length !== 0 ? getGenresCount(filmsInRange) : 0;
  const topGenre = genresCount !== 0 ? getTopGenre(genresCount) : ``;

  return (
    `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${rank}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>
      ${statisticFiltersMarkup}
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${filmsInRange.length} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration </h4>
        <p class="statistic__item-text">${totalHours} <span class="statistic__item-description">h</span> ${totalMinutes} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${topGenre}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`
  );
};

export default class Statistics extends SmartView {
  constructor(films) {
    super();
    this._data = {
      films,
      currentRange: ALLTIME.value
    };

    this._rangeChangeHandler = this._rangeChangeHandler.bind(this);
    this._setRangeChangeHandler();
  }

  getTemplate() {
    return createStatisticsMarkup(this._data);
  }

  restoreHandlers() {
    this._setRangeChangeHandler();
  }

  _rangeChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({currentRange: evt.target.value});
  }

  _setRangeChangeHandler() {
    this.getElement().querySelector(`.statistic__filters`).addEventListener(`change`, this._rangeChangeHandler);
  }
}
