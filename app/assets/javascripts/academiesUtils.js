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
        html: `<b>${academy.previousOfstedRating}</b><br>${formatDate(
          academy.previousOfstedRatingDate
        )}`,
      },
    ];
  });

  const formatAcademyRowsVersion4b = (academies) =>
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
        html: `${academy.phase}<br>(${academy.minPupilAge} - ${academy.maxPupilAge})`,
        attributes: {
          "data-sort-value": `${academy.minPupilAge}${academy.maxPupilAge}`,
        },
      },
      {
        text: academy.pupilNumbers.toLocaleString(),
        attributes: {
          "data-sort-value": academy.pupilNumbers,
        },
      },
      {
        html: `${academy.capacity.toLocaleString()}<br>(${getPercentageCapacity(academy.pupilNumbers, academy.capacity)}%)`,
        attributes: {
          "data-sort-value": academy.capacity,
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
        )}
        <br>
        ${getOfstedTag(academy)}`,
      },
    ];
  });



class AcademiesSummary {
  constructor(academies) {
    this.totalPupilNumbers = academies.reduce((acc,academy) => acc + academy.pupilNumbers, 0);
    this.totalCapacity = academies.reduce((acc,academy) => acc + academy.capacity, 0);
    this.percentageCapacity = getPercentageCapacity(this.totalPupilNumbers, this.totalCapacity);
  }
}

const getPercentageCapacity = (pupilNumbers, capacity) => {
  return Math.round(pupilNumbers / capacity * 100);
}

const getOfstedTag = academy => {
  return `<strong class="govuk-tag govuk-tag--green govuk-!-margin-top-2 govuk-!-margin-bottom-1"> Improved </strong>`
}

module.exports = { AcademiesSummary, formatAcademyRows, formatAcademyRowsVersion4b };
