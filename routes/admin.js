var express = require('express');
var router = express.Router();


const adminCredentials = {
  email: 'hotelsys@gmail.com',
  password: 'brenda'
}

/* admin dashboard. */
router.get('/', function(req, res, next) {
  res.render('admin/dashboard', {title: 'dashboard'});
});

// display admin login page
router.get('/login', (req, res, next)=>{
  const admin = {
    email: '',
    password: ''
  }
  res.render('admin/login', {title: 'login', admin:admin, error:false});
})
// submit admin login page
router.post('/login',(req, res, next)=>{
  const admin = {
    email:req.body.email,
    password: req.body.password
  
  }
  if (adminCredentials.email === admin.email) {

    if (adminCredentials.password === admin.password) {
      req.session.user = 'admin'
      res.redirect('/admin')
      
    } else {
      let message = 'incorrect password'
    res.render('admin/login', {title: 'login', admin:admin, error:true, message:message});

    }
    
  } else {
    let message = 'email does not exist'
    res.render('admin/login', {title: 'login', admin:admin, error:true, message:message});
    
  }

})


module.exports = router;
