const dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'Egypt',
};
const timeOptions = {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Egypt',
};

exports.formatDateAndTime = (time) => {
  const formattedDate = time.toLocaleDateString('ar-EG', dateOptions);
  const formattedTime = time.toLocaleTimeString('ar-EG', timeOptions);

  return { formattedDate, formattedTime };
};
