import {EMOJIS} from "../const.js";

const formatCommentDate = (day) => {
  const year = day.getFullYear();
  const month = (day.getMonth() + 1) < 10 ? `0${day.getMonth() + 1}` : day.getMonth();
  const date = day.getDate() < 10 ? `0${day.getDate()}` : day.getDate();
  const hours = day.getHours();
  const minutes = day.getMinutes() < 10 ? `0${day.getMinutes()}` : day.getMinutes();

  return `${ year}/${month}/${date} ${hours}:${minutes}`;
};

const createCommentMarkup = (comments) => {

  return comments.map((comment) => {
    const {emoji, text, author, day} = comment;

    const date = formatCommentDate(day);

    return (
      `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
      <img src="${emoji}" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
      <p class="film-details__comment-text">${text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${date}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
      </div>
      </li>`
    );
  }).join(``);
};

const createEmojiListMarkup = () => {

  return EMOJIS.map((emoji) =>
    `<input class="film-details__emoji-item visually-hidden" name="comment-emoji"
    type="radio" id="emoji-${emoji.substring(15, emoji.length - 4)}" value="${emoji.substring(15, emoji.length - 4)}">
    <label class="film-details__emoji-label" for="emoji-${emoji.substring(15, emoji.length - 4)}">
    <img src="${emoji}" width="30" height="30" alt="emoji">
    </label>`).join(``);
};

export const createCommentsMarkup = (comments) => {
  const commentMarkup = createCommentMarkup(comments);
  const emojiListMarkup = createEmojiListMarkup();

  return (
    `<section class="film-details__comments-wrap">
    <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
    <ul class="film-details__comments-list">
    ${commentMarkup}
  </ul>
  <div class="film-details__new-comment">
    <div for="add-emoji" class="film-details__add-emoji-label"></div>
    <label class="film-details__comment-label">
      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
    </label>
    <div class="film-details__emoji-list">
    ${emojiListMarkup}
    </div>
  </div>
  </section>`
  );
};
