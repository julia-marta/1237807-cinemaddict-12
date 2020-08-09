export const createProfileMarkup = (profile) => {
  const {rank} = profile;

  return (
    `<section class="header__profile profile">
    ${rank !== 0 ? `<p class="profile__rating">${rank}</p>` : ``}
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};
