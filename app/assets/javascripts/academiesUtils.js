const { formatDate } = require("./dateUtils");

const formatAcademyRows = (academies) =>
  academies.map((academy) => {
    return [
      {
        html: `<b>${academy.name}</b>`,
        attributes: {
          "data-sort-value": academy.name,
        },
      },
      {
        text: academy.localAuthority,
      },
      {
        text: academy.phase,
      },
      {
        text: `${academy.minPupilAge} - ${academy.maxPupilAge}`,
        attributes: {
          "data-sort-value": `${academy.minPupilAge}${academy.maxPupilAge}`,
        },
      },
      {
        text: academy.capacity.toLocaleString(),
        attributes: {
          "data-sort-value": academy.capacity,
        },
      },
      {
        text: academy.pupilNumbers.toLocaleString(),
        attributes: {
          "data-sort-value": academy.pupilNumbers,
        },
      },
      {
        text: formatDate(academy.dateJoined, {
          year: "numeric",
          month: "long",
        }),
        attributes: {
          "data-sort-value": academy.dateJoined,
        },
      },
      {
        html: `<b>${academy.currentOfstedRating}</b><br>${formatDate(
          academy.currentOfstedRatingDate
        )}`,
      },
      {
        html: `<b>${academy.currentOfstedRating}</b><br>${formatDate(
          academy.currentOfstedRatingDate
        )}`,
      },
    ];
  });


class AcademiesSummary {
  constructor(academies) {
    this.totalPupilNumbers = academies.reduce((acc,academy) => acc + academy.pupilNumbers, 0);
    this.totalCapacity = academies.reduce((acc,academy) => acc + academy.capacity, 0);
    this.percentageCapacity = Math.round(this.totalPupilNumbers / this.totalCapacity * 100)
  }
}

module.exports = { AcademiesSummary, formatAcademyRows };
