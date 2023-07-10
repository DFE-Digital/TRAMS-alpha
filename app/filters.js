const govukPrototypeKit = require("govuk-prototype-kit");
const { formatAcademyRows, formatAcademyRowsVersion4a, formatAcademyRowsVersion4b } = require("./assets/javascripts/academiesUtils");
const { formatGovernorRows, formatTrustContacts, formattrustleadershipRows, formatAppointedByRows } = require("./assets/javascripts/governanceUtils");
const {
  getLocalAuthoritiesWithCount,
} = require("./assets/javascripts/trust-utils");
const addFilter = govukPrototypeKit.views.addFilter;

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
addFilter("formatGovernorRows", formatGovernorRows);
addFilter("getLocalAuthoritiesWithCount", getLocalAuthoritiesWithCount);
addFilter("formatTrustContacts", formatTrustContacts);
addFilter("formattrustleadershipRows", formattrustleadershipRows);
addFilter("formatAppointedByRows", formatAppointedByRows);
