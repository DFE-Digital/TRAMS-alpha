const govukPrototypeKit = require("govuk-prototype-kit");
const { formatAcademyRows, formatAcademyRowsVersion4a, formatAcademyRowsVersion4b, formatAcademyRowsVersion5Ofsted, formatAcademyRowsVersion5PupilNumbers, formatAcademyRowsVersion5FreeSchoolMeals, formatAcademyRowsVersion5Details, getAcademiesSummary } = require("./assets/javascripts/academiesUtils");
const { formatGovernorRows, formatTrustContacts, addWarning } = require("./assets/javascripts/governanceUtils");
const {
  getLocalAuthoritiesWithCount,
} = require("./assets/javascripts/trust-utils");
const addFilter = govukPrototypeKit.views.addFilter;
const addGlobal = govukPrototypeKit.views.addGlobal;

addGlobal("getAcademiesSummary", getAcademiesSummary);

addFilter("formatDate", function (date) {
  try {
    const newDate = new Date(date);

    let options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("en-GB", options).format(newDate);
  } catch {
    return "---";
  }
});

addFilter("formatNumber", function (num) {
  return num.toLocaleString();
});

addFilter("formatAcademyRows", formatAcademyRows);
addFilter("formatAcademyRowsVersion4a", formatAcademyRowsVersion4a);
addFilter("formatAcademyRowsVersion4b", formatAcademyRowsVersion4b);
addFilter("formatAcademyRowsVersion5Details", formatAcademyRowsVersion5Details);
addFilter("formatAcademyRowsVersion5Ofsted", formatAcademyRowsVersion5Ofsted);
addFilter("formatAcademyRowsVersion5PupilNumbers", formatAcademyRowsVersion5PupilNumbers);
addFilter("formatAcademyRowsVersion5FreeSchoolMeals", formatAcademyRowsVersion5FreeSchoolMeals);
addFilter("formatGovernorRows", formatGovernorRows);
addFilter("getLocalAuthoritiesWithCount", getLocalAuthoritiesWithCount);
addFilter("formatTrustContacts", formatTrustContacts);
addFilter("addWarning", addWarning);
