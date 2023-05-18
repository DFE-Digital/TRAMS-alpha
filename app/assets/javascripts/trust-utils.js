const getLocalAuthoritiesWithCount = academies => {
  let html = '';
  for (const [localAuthority, count] of Object.entries(countLocalAuthorities(academies))) {
    html += `<p class="govuk-!-margin-bottom-1">${localAuthority}(${count})</p>`
  }
  return html;
}

const countLocalAuthorities = academies => {
  const authoritiesWithCount = {}
  academies.forEach(academy => {
    if (authoritiesWithCount[academy.localAuthority]) {
      authoritiesWithCount[academy.localAuthority]++
    } else {
      authoritiesWithCount[academy.localAuthority] = 1
    }
  })
  return authoritiesWithCount;
}

module.exports = { getLocalAuthoritiesWithCount };