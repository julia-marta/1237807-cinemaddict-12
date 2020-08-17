import AbstractView from "./abstract.js";

const createProfileMarkup = (profile) => {
  const {rank} = profile;

  return (
    `<section class="header__profile profile">
    ${rank !== `none` ? `<p class="profile__rating">${rank}</p>` : ``}
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class Profile extends AbstractView {
  constructor(profile) {
    super();
    this._profile = profile;
  }

  getTemplate() {
    return createProfileMarkup(this._profile);
  }
}
