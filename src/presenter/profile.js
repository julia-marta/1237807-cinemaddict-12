import ProfileView from "../view/profile.js";
import {getRank} from "../utils/profile.js";
import {render, replace, remove} from "../utils/render.js";

export default class Profile {
  constructor(profileContainer, moviesModel) {
    this._profileContainer = profileContainer;
    this._moviesModel = moviesModel;
    this._profileComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._moviesModel.addObserver(this._handleModelEvent);
  }

  init() {
    const watchedFilmsCount = this._moviesModel.getWatchedMovies().length;
    const rank = getRank(watchedFilmsCount);

    const prevProfileComponent = this._profileComponent;
    this._profileComponent = new ProfileView(rank);

    if (prevProfileComponent === null) {
      render(this._profileContainer, this._profileComponent);
      return;
    }
    replace(prevProfileComponent, this._profileComponent);
    remove(prevProfileComponent);
  }

  _handleModelEvent() {
    this.init();
  }
}
