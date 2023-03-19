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

exports.formatDateAndTime = (time) => {
  const formattedDate = time.toLocaleDateString('ar-EG', dateOptions);
  const formattedTime = time.toLocaleTimeString('ar-EG', timeOptions);

  return { formattedDate, formattedTime };
};
