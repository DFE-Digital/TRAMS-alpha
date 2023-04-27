//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//
const { get } = require('jquery');
const { AcademiesSummary } = require('./assets/javascripts/academiesUtils');
const trusts = require('./data/invented-trust-data').trusts;

const govukPrototypeKit = require('govuk-prototype-kit');

const router = govukPrototypeKit.requests.setupRouter()

router.get(/version-\d+\/home/, function (request, response) {
  const currentVersion = request.url.split("/")[1];

  //version-1 does not support variables \
  if (currentVersion === "version-1"){
    response.render(currentVersion + '/home');
    return;
  }

  response.locals.data.trusts = trusts;
  response.render(currentVersion + '/home');
});

router.post(/version-\d+\/search-results/, function (request, response) {
  const currentVersion = request.url.split("/")[1];
  const trusts = searchForTrusts(request.session.data.search);

if (trusts) {
  response.locals.data.searchResults = trusts;
  response.render(currentVersion + '/search-results');

} else {
  response.locals.data.trusts = trusts.slice(0, 10);
  response.render(currentVersion + '/not-found');
}
});


router.get("/version-*/trust-details/:uid", function (request, response) {
  const currentVersion = request.url.split("/")[1];
  const uid = request.params.uid;
  const trust = getTrustByUid(uid);
  //response locals data will be used by next page render
  response.locals.data.trust = trust;
  //session data will be persisted for future pages
  request.session.data.trust = trust;
  response.redirect('../trust-details');
})

router.post(/version-\d+\/trust-details/, function (request, response) {
  const currentVersion = request.url.split("/")[1];

  //version-1 does not support variables so no searching required
  if (currentVersion === "version-1"){
    response.render(currentVersion + '/trust-details');
    return;
  }

  let trusts = searchForTrusts(request.session.data.search);

  if (trusts) {
    //response locals data will be used by next page render
    response.locals.data.trust = trusts[0];
    //session data will be persisted for future pages
    request.session.data.trust = trusts[0];
    response.render(currentVersion + '/trust-details');
  } else {
    response.locals.data.trusts = trusts.slice(0, 10);
    response.render(currentVersion + '/not-found');
  }
});

router.get(
  /version-\d+\/academies-in-this-trust/,
  function (request, response) {
    const currentVersion = request.url.split("/")[1];

    //version-1 does not support variables so return immediately
    if (currentVersion === "version-1") {
      response.render(currentVersion + "/academies-in-this-trust");
      return;
    }

    response.locals.data.academiesSummary = new AcademiesSummary(
      request.session.data.trust.academiesInTrust.academies
    );
    response.render(currentVersion + "/academies-in-this-trust");
  }
);

const searchForTrusts = (searchTerm) => {
  const searchTermLower = searchTerm.toLowerCase();
  return trusts.filter(t => t.name.toLowerCase().includes(searchTermLower) || t.uid === searchTermLower);
}

const getTrustByUid = (uid) => {
  return trusts.find(t => t.uid === uid);
}
