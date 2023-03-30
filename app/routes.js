//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//
const GovernanceUtils = require('./assets/javascripts/governanceUtils');
const trusts = require('./data/invented-trust-data').trusts;

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.post('/version-2/trust-details', function (request, response) {
  let trust;
  const searchTerm = request.session.data.search;
  if (searchTerm) {
    const searchTermLower = searchTerm.toLowerCase();
    trust = trusts.filter(t => t.name.toLowerCase().includes(searchTermLower) || t.uid === searchTermLower)[0];
  }

  if (trust) {
    response.locals.data.trust = trust;
    response.render('version-2/trust-details');
  } else {
    response.locals.data.trusts = trusts.slice(0, 10);
    response.render('version-2/not-found');
  }
});

router.get('/version-2/governance', function (request, response) {
  const search = request.session.data.search;

  let trust;
  if (search) {
    trust = searchTrust(search);
    response.locals.data.trust = trust;
  } else {
    trust = request.locals.data.trust;
  }

  const present = GovernanceUtils.getRows(trust.governance.present, true);
  const members = GovernanceUtils.getRows(trust.governance.members);
  const past = GovernanceUtils.getRows(trust.governance.past);

  response.locals.data.governanceRows = {
    present,
    members,
    past
  }
  response.render('version-2/governance');
});

const searchTrust = (searchTerm) => {
  const searchTermLower = searchTerm.toLowerCase();
    return trusts.filter(t => t.name.toLowerCase().includes(searchTermLower) || t.uid === searchTermLower)[0];
}

