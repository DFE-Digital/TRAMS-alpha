const DateUtils = require("./dateUtils");

const getRows = (governors, isCurrent = false) => governors.map(governor => getRow(governor,isCurrent));

const getRow = (governor, isCurrent) => {
  let nameText = governor.name
  if (isCurrent && (governor.role === 'Accounting Officer' || governor.role === 'Chair of Trustees')) {
    nameText += `<br><a class="govuk-link" href="mailto:${governor.email}">${governor.email}</a>`
  }
  return ([
    { html: nameText },
    { text: governor.role },
    { text: DateUtils.formatDate(governor.dateAppointed) },
    { text: DateUtils.formatDate(governor.termEnd) }
  ])
}

module.exports = { getRows };