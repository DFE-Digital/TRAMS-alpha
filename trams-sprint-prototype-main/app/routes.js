const express = require('express')
const router = express.Router()

var NotifyClient = require('notifications-node-client').NotifyClient

var notifyClient = new NotifyClient(process.env.apikey)

// Add your routes here - above the module.exports line

router.get('/academy/financial', function (req, res) {
  req.session.data = {}

  return res.render('academy/financial', {})
})

router.get('/reporting/fha/cya', function (req, res) {
  req.session.data['cya'] = 'true'

  return res.render('reporting/fha/cya', {})
})

router.get('/reporting/fha/complete', function (req, res) {
  if (process.env.send === 'true') {
    notifyClient
      .sendEmail(process.env.template, process.env.email, {
        personalisation: {},
      })
      .then((response) => console.log(response))
      .catch((err) => console.error(err))
  }



  return res.render('reporting/fha/complete', {})
})

module.exports = router
