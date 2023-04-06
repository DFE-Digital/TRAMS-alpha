//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//
const GovernanceUtils = require('./assets/javascripts/governanceUtils');
const trusts = require('./data/invented-trust-data').trusts;

const govukPrototypeKit = require('govuk-prototype-kit');
const { formatDate } = require('./assets/javascripts/dateUtils');
const router = govukPrototypeKit.requests.setupRouter()

router.post(/version-\d+\/trust-details/, function (request, response) {
  const currentVersion = request.url.split("/")[1];

  //version-1 does not support variables so no searching required
  if (currentVersion === "version-1"){
    response.render(currentVersion + '/trust-details');
    return;
  }

  let trust = searchForTrust(request.session.data.search);

  if (trust) {
    //response locals data will be used by next page render
    trust.trustDetails.dateIncorporatedString = formatDate(trust.trustDetails.dateIncorporated)
    trust.trustDetails.dateOpenedString = formatDate(trust.trustDetails.dateOpened)
    trust.trustDetails.sponsorApprovalDateString = formatDate(trust.trustDetails.sponsorApprovalDate)

    response.locals.data.trust = trust;
    //session data will be persisted for future pages
    request.session.data.trust = trust;
    response.render(currentVersion + '/trust-details');
  } else {
    response.locals.data.trusts = trusts.slice(0, 10);
    response.render(currentVersion + '/not-found');
  }
});

router.get(/version-\d+\/governance/, function (request, response) {
  const currentVersion = request.url.split("/")[1];

  //version-1 does not support variables so no governance rows required
  if (currentVersion === "version-1"){
    response.render(currentVersion + '/governance');
    return;
  }

  const present = GovernanceUtils.getRows(request.session.data.trust.governance.present, true);
  const members = GovernanceUtils.getRows(request.session.data.trust.governance.members);
  const past = GovernanceUtils.getRows(request.session.data.trust.governance.past);

  response.locals.data.governanceRows = {
    present,
    members,
    past
  }
  response.render(currentVersion + '/governance');
});

const searchForTrust = (searchTerm) => {
  const searchTermLower = searchTerm.toLowerCase();
  return trusts.filter(t => t.name.toLowerCase().includes(searchTermLower) || t.uid === searchTermLower)[0];
}
