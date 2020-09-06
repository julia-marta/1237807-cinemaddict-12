import moment from "moment";
import 'moment-duration-format';

export const formatDuration = (minutes) => {

  return moment.duration(minutes, `minutes`).format(`h[h] m[m]`);
};

export const formatDate = (date, isFullDate) => {
  if (isFullDate) {
    return moment(date).format(`DD MMMM YYYY`);
  } else {
    return moment(date).format(`YYYY`);
  }
};

export const humanizeCommentDate = (date) => {

  return moment(date).fromNow();
};
