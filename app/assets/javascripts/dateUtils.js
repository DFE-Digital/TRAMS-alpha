const formatDate = (date, options = {
  year: "numeric",
  month: "short",
  day: "numeric",
}) => {
  const newDate = new Date(date);
  return new Intl.DateTimeFormat("en-GB", options).format(newDate);
}

module.exports = { formatDate };
