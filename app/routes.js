//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//
let trusts = require('./data/invented-trust-data').trusts;

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.post('/version-1/trust-details', function (request, response) {
  let searchterm = request.body.search.toLowerCase();

  let trust = trusts.filter(t => t.Name.toLowerCase().includes(searchterm) || t.Uid === searchterm)[0];

  if (searchterm && trust) {
    response.locals.trust = trust;
    response.render('version-1/trust-details');
  }
  else {
    response.locals.searchterm = searchterm;
    response.locals.trusts = trusts.slice(0, 10);
    response.render('version-1/not-found');
  }
});
