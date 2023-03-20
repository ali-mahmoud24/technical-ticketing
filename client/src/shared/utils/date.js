const dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};
const timeOptions = {
  hour: '2-digit',
  minute: '2-digit',
};

export const formatDateAndTime = (time) => {
  const formattedDate = time.toLocaleDateString('ar-EG', dateOptions);
  const formattedTime = time.toLocaleTimeString('ar-EG', timeOptions);

  return { formattedDate, formattedTime };
};

export const formatDate = (date) => {
  var validDate = Date.parse(date);

  if (!validDate) {
    return;
  }

  const formattedDate = date.toLocaleDateString('ar-EG', dateOptions);
  return formattedDate;
};

export const formatTime = (time) => {
  var validTime = Date.parse(time);

  if (!validTime) {
    return;
  }
  const formattedDate = time.toLocaleTimeString('ar-EG', timeOptions);
  return formattedDate;
};
