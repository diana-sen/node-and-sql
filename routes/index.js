var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send( { title: 'Express with SQL' });
});

/* GET health page. */
/* router.get('/health', function(req, res, next) {
  res.send( { status: 'OK' });
}); */

module.exports = router;
