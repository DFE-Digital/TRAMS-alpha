const DateUtils = require("./dateUtils");

const formatGovernorRows = (governors, options = {showContactDetails: false, showRole: true, showAppointmentType: false }) => governors.map(governor => getRow(governor, options));

const getRow = (governor, options) => {
  const { showContactDetails, showRole, showAppointmentType } = options
  let nameText = governor.name
  if (showContactDetails && (governor.role === 'Accounting officer' || governor.role === 'Chair of trustees')) {
    nameText += `<br><a class="govuk-link" href="mailto:${governor.email}">${governor.email}</a>`
  }

  let row = [{html: nameText}]
  if (showRole) row.push({ text: governor.role })
  if (showAppointmentType) row.push({ text: governor.appointmentType })
  
  return row.concat([
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

module.exports = { formatGovernorRows, formatTrustContacts };
