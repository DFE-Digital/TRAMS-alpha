//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//
const trusts = require('./data/invented-trust-data').trusts;

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.post('/version-2/trust-details', function (request, response) {
  let trust;
  const searchTerm = request.session.data.search;
  if (searchTerm) {
    const searchTermLower = searchTerm.toLowerCase();
    trust = trusts.filter(t => t.Name.toLowerCase().includes(searchTermLower) || t.Uid === searchTermLower)[0];
  }

  if (trust) {
    response.locals.data.trust = trust;
    response.render('version-2/trust-details');
  } else {
    response.locals.data.trusts = trusts.slice(0, 10);
    response.render('version-2/not-found');
  }
});
