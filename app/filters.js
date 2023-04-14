const govukPrototypeKit = require('govuk-prototype-kit');
const { formatAcademyRows } = require('./assets/javascripts/academiesUtils');
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

addFilter("formatAcademyRows", formatAcademyRows);
