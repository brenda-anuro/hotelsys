var express = require('express');
const req = require('express/lib/request');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('this is the primary route for users');
});

// users login page
router.get('/login', (req, res, next)=>{
  res.send ('login page from users route');
})

module.exports = router;
