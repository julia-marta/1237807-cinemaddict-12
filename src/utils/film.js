import moment from "moment";

export const formatDuration = (minutes) => {
  const duration = moment.duration(minutes, `minutes`);
  const durationHours = `${duration.hours() > 0 ? `${duration.hours()}h` : ``}`;
  const durationMinutes = `${duration.minutes() > 0 ? `${duration.minutes()}m` : ``}`;

  return `${durationHours} ${durationMinutes}`;
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
