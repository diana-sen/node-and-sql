const express = require('express');
const router = express.Router();
const package = require('../package.json')
const time= Date.now();
const now= new Date(time);

console.log(package)



/* GET home page. */
router.get('/', (req, res, next) =>  res.send( { name: package.name, date: now.toString() }));

// URL types

// URL with parameters
router.get('/users/:name', (req, res, next) =>  {
  console.log(req.params);
  res.send( { name: req.params.name });
});

router.get('/users/:name/:id', (req, res, next) =>  {
  console.log(req.params)
  res.send( { name: req.params.name , id: req.params.id });
});

// URL with query string
router.get('/list', (req, res, next) => {
  let numbers =[ 51, 92, 31, 45, 50, 96];

  console.log(req.query)
  res.send( { number: req.query.sort ? numbers.sort() : numbers });
}); 

/* GET health page. */
/* router.get('/health', function(req, res, next) {
  res.send( { status: 'OK' });
}); */

module.exports = router;
