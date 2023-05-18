const govukPrototypeKit = require('govuk-prototype-kit');
const { formatAcademyRows } = require('./assets/javascripts/academiesUtils');
const { formatGovernorRows } = require('./assets/javascripts/governanceUtils');
const { getLocalAuthoritiesWithCount } = require('./assets/javascripts/trust-utils');
const addFilter = govukPrototypeKit.views.addFilter

addFilter("formatDate", function (date) {
    try {
        const newDate = new Date(date);

        let options = {
            year: "numeric",
            month: "short",
            day: "numeric",
        };
        return new Intl.DateTimeFormat("en-GB", options).format(newDate);
    }
    catch {
        return "---"
    }
});

addFilter("formatNumber", function (num) {
    return num.toLocaleString(); 
})

addFilter("formatAcademyRows", formatAcademyRows);
addFilter("formatGovernorRows", formatGovernorRows);
addFilter("getLocalAuthoritiesWithCount", getLocalAuthoritiesWithCount);