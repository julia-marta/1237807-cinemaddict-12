import {createElement} from "../utils.js";

const createProfileMarkup = (profile) => {
  const {rank} = profile;

  return (
    `<section class="header__profile profile">
    ${rank !== 0 ? `<p class="profile__rating">${rank}</p>` : ``}
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class Profile {
  constructor(profile) {
    this._profile = profile;
    this._element = null;
  }

  getTemplate() {
    return createProfileMarkup(this._profile);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
