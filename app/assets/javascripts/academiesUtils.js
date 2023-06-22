const { formatDate } = require("./dateUtils");

const OFSTED_RATINGS = {
  outstanding: "Outstanding",
  good: "Good",
  requiresImprovement: "Requires improvement",
  inadequate: "Inadequate",
  notYetInspected: "Not yet inspected",
};

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
          month: "short",
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

const formatAcademyRowsVersion4a = (academies) =>
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
        html: `${academy.phase}<br>${academy.minPupilAge} - ${academy.maxPupilAge}`,
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
        html: academy.capacity.toLocaleString(),
        attributes: {
          "data-sort-value": academy.capacity,
        },
      },
      {
        html: `${getPercentageCapacity(
          academy.pupilNumbers,
          academy.capacity
        )}%`,
        attributes: {
          "data-sort-value": academy.capacity,
        },
      },
      {
        text: formatDate(academy.dateJoined, {
          year: "numeric",
          month: "short",
        }),
        attributes: {
          "data-sort-value": academy.dateJoined,
        },
      },
      {
        html: 
        academy.currentOfstedRating !== OFSTED_RATINGS.notYetInspected &&
        getOfstedRatingText(academy, "previousOfstedRating"),
      },
      {
        html:
          getOfstedRatingText(academy, "currentOfstedRating"),
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
        html: `${academy.capacity.toLocaleString()}<br>(${getPercentageCapacity(
          academy.pupilNumbers,
          academy.capacity
        )}%)`,
        attributes: {
          "data-sort-value": academy.capacity,
        },
      },
      {
        text: formatDate(academy.dateJoined, {
          year: "numeric",
          month: "short",
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
        ${getOfstedRatingChangeTag(academy)}`,
      },
    ];
  });

class AcademiesSummary {
  constructor(academies) {
    this.totalPupilNumbers = academies.reduce(
      (acc, academy) => acc + academy.pupilNumbers,
      0
    );
    this.totalCapacity = academies.reduce(
      (acc, academy) => acc + academy.capacity,
      0
    );
    this.percentageCapacity = getPercentageCapacity(
      this.totalPupilNumbers,
      this.totalCapacity
    );
  }
}

const getPercentageCapacity = (pupilNumbers, capacity) => {
  return Math.round((pupilNumbers / capacity) * 100);
};

const getOfstedRatingAsNum = (ofsted) => {
  switch (ofsted) {
    case OFSTED_RATINGS.outstanding:
      return 4;
    case OFSTED_RATINGS.good:
      return 3;
    case OFSTED_RATINGS.requiresImprovement:
      return 2;
    case OFSTED_RATINGS.inadequate:
      return 1;
    case OFSTED_RATINGS.notYetInspected:
      return 0;

    default:
      return -1;
  }
};

const getOfstedRatingChangeTag = (academy) => {
  if (academy.currentOfstedRating === OFSTED_RATINGS.notYetInspected)
    return `<strong class="govuk-tag govuk-tag--grey govuk-!-margin-top-2 govuk-!-margin-bottom-1"> Not yet inspected </strong>`;
  else if (academy.previousOfstedRating === OFSTED_RATINGS.notYetInspected)
    return `<strong class="govuk-tag govuk-tag--grey govuk-!-margin-top-2 govuk-!-margin-bottom-1"> Not enough data </strong>`;
  else {
    let change =
      getOfstedRatingAsNum(academy.currentOfstedRating) -
      getOfstedRatingAsNum(academy.previousOfstedRating);

    if (change === 0)
      return `<strong class="govuk-tag govuk-tag--blue govuk-!-margin-top-2 govuk-!-margin-bottom-1"> Maintained </strong>`;
    else if (change > 0)
      return `<strong class="govuk-tag govuk-tag--green govuk-!-margin-top-2 govuk-!-margin-bottom-1"> Improved </strong>`;
    else
      return `<strong class="govuk-tag govuk-tag--red govuk-!-margin-top-2 govuk-!-margin-bottom-1"> Declined </strong>`;
  }
};
const getOfstedStatusJoiningTag = (ofstedDate, dateJoined) => {
  if (dateJoined > ofstedDate) {
    return `<strong class="govuk-tag govuk-tag--grey govuk-!-margin-top-2 govuk-!-margin-bottom-1"> Before joining </strong>`; 
  } else {
    return `<strong class="govuk-tag govuk-tag govuk-!-margin-top-2 govuk-!-margin-bottom-1"> After joining </strong>`;
  }
};

const getOfstedRatingText = (academy, ofstedRatingPropName) => {
  let html = `<b>${academy[ofstedRatingPropName]}</b>`;
  if (academy[ofstedRatingPropName] !== OFSTED_RATINGS.notYetInspected) {
    html += `<br>${formatDate(academy[ofstedRatingPropName + "Date"])}
    <br>
    ${getOfstedStatusJoiningTag(
      academy[ofstedRatingPropName + "Date"],
      academy.dateJoined
    )}`;
  }
  return html;


};

module.exports = {
  AcademiesSummary,
  formatAcademyRows,
  formatAcademyRowsVersion4a,
  formatAcademyRowsVersion4b,
};
