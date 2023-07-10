const DateUtils = require("./dateUtils");

const formatGovernorRows = (governors, isCurrent = false) => governors.map(governor => getRow(governor, isCurrent));

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

const formatTrustContacts = (presentGovernors) => presentGovernors.filter(governor => governor.role !== 'Trustee').map(governor => {
  const html = `
    <p class="govuk-!-margin-bottom-1">${governor.name}</p>
    <p class="govuk-!-margin-bottom-1">
      <a class="govuk-link" href="${governor.email}">${governor.email}</a>
    </p>
    <p class="govuk-!-margin-bottom-1">Telephone: ${governor.telephone}</p>
    `

  return ({
    key: {
      text: governor.role
    },
    value: {
      html
    }
  })

});

const formattrustleadershipRows = (governors) => governors.map(governor => gettrustleadershipRow(governor));

const gettrustleadershipRow = (governor) => {
  return ([
    { html: governor.name },
    { text: governor.role },
    { text: DateUtils.formatDate(governor.dateAppointed) },
    { text: DateUtils.formatDate(governor.termEnd) }
  ])
}

const formatAppointedByRows = (governors) => governors.map(governor => getAppointedByRow(governor));

const getAppointedByRow = (governor) => {
  return ([
    { html: governor.name },
    { text: governor.appointmentType },
    { text: DateUtils.formatDate(governor.dateAppointed) },
    { text: DateUtils.formatDate(governor.termEnd) }
  ])
}

module.exports = { formatGovernorRows, formatTrustContacts, formattrustleadershipRows, formatAppointedByRows };
