//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//
const { AcademiesSummary } = require('./assets/javascripts/academiesUtils');
const { trusts } = require('./data/invented-trust-data');

const govukPrototypeKit = require('govuk-prototype-kit');

const router = govukPrototypeKit.requests.setupRouter();


// Routes across all versions

router.get("/version-*/home/", function (request, response) {
  const currentVersion = request.url.split("/")[1];

  //version-1 does not support variables \
  if (currentVersion === "version-1"){
    response.render(currentVersion + '/home');
    return;
  }

  response.locals.data.trusts = trusts;
  response.render(currentVersion + '/home');
});

router.post("/version-*/search/", function (request, response) {
  const currentVersion = request.url.split("/")[1];
  const {search, uid} = request.session.data;

  if (uid) {
    response.redirect(`./trust-details/${uid}`);
    return;
  }

  response.locals.data.searchResults = searchForTrusts(search);
  response.render(currentVersion + '/search');
});

router.get("/version-*/trust-details/:uid", function (request, response) {
  const uid = request.params.uid;
  setTrust(request, response, getTrustByUid(uid));
  response.redirect('../trust-details');
})

router.get("/version-*/academies-in-this-trust/", function (request, response) {
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

// Routes for specific versions

router.post("/version-2/trust-details", function (request, response) {
  let searchResults = searchForTrusts(request.session.data.search);

  if (searchResults && searchResults.length > 0) {
    setTrust(request, response, searchResults[0]);
    response.render('version-2/trust-details');
  } else {
    response.locals.data.trusts = trusts.slice(0, 100);
    response.render('version-2/not-found');
  }
});


// Routes for api requests

router.get('/api/trusts', function(request, response) {
  const query = request.query.query;
  response.json(searchForTrusts(query).map(trust => ({
    name: trust.name,
    address: trust.trustDetails.address,
    uid: trust.uid
  })))
})


const searchForTrusts = (searchTerm) => {
  const searchTermLower = searchTerm.toLowerCase();
  return trusts.filter(t => t.name.toLowerCase().includes(searchTermLower) || t.uid === searchTermLower || t.trustDetails.address.toLowerCase().includes(searchTermLower));
}

const getTrustByUid = (uid) => {
  return trusts.find(t => t.uid === uid);
}

const setTrust = (request, response, trust) => {
    //response locals data will be used by next page render
    response.locals.data.trust = trust;
    //session data will be persisted for future pages
    request.session.data.trust = trust;
}
