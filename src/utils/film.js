import moment from "moment";
import 'moment-duration-format';

export const formatDuration = (minutes) => {

  return moment.duration(minutes, `minutes`).format(`h[h] m[m]`);
};

export const formatDate = (date, isFullDate) => {
  return isFullDate ? moment(date).format(`DD MMMM YYYY`) : moment(date).format(`YYYY`);
};

export const humanizeCommentDate = (date) => {

  return moment(date).fromNow();
};
