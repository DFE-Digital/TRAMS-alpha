const formatDate = (date) => {
  const newDate = new Date(date);
  let options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("en-GB", options).format(newDate);
}

module.exports = { formatDate };
