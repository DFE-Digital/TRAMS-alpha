//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//
const trusts = require('./data/invented-trust-data').trusts;

const govukPrototypeKit = require('govuk-prototype-kit');

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
    response.locals.data.trust = trust;
    //session data will be persisted for future pages
    request.session.data.trust = trust;
    response.render(currentVersion + '/trust-details');
  } else {
    response.locals.data.trusts = trusts.slice(0, 10);
    response.render(currentVersion + '/not-found');
  }
});

const searchForTrust = (searchTerm) => {
  const searchTermLower = searchTerm.toLowerCase();
  return trusts.filter(t => t.name.toLowerCase().includes(searchTermLower) || t.uid === searchTermLower)[0];
}
