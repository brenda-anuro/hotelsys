var express = require('express');
const req = require('express/lib/request');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin/dashboard', {title: 'dashboard'});
});

// users login page
router.get('/login', (req, res, next)=>{
  res.render('admin/login', {title: 'login'});
})


module.exports = router;
