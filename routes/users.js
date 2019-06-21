var express = require('express');
var router = express.Router();
var graphqlHTTP = require('express-graphql')

var userGet = require('../root-query/user')

/* GET users listing. */
router.get('/', (req, res) => {
  res.json({ user: true })
})

module.exports = router;
