var express = require('express');
const app = require('../app');
const connection = require('../db_config')
var router = express.Router();
var multer = require('multer');
const uploads = multer({dest: 'public/uploads'})


const adminCredentials = {
  email: 'hotelsys@gmail.com',
  password: 'brenda'
}

/* admin dashboard. */
router.get('/', function(req, res, next) {
  if (res.locals.isLoggedIn) {
    res.render('admin/dashboard', {title: 'dashboard'});
  } else {
    res.redirect('/admin/login')
    
  }
  
});

// display admin login page

router.get('/login', (req, res, next)=>{
  if (res.locals.isLoggedIn) {
    res.redirect('/admin')
  } else {
    const admin = {
      email: '',
      password: ''
    }
    res.render('admin/login', {title: 'login', admin:admin, error:false});
    
  }

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
// logout functionality
router.get('/logout', (req, res)=>{
  // destroy session
  req.session.destroy(()=>{
    res.redirect('/admin/login')
  })
})

// create menu 
router.get('/create', (req, res)=>{
  if (res.locals.isLoggedIn) {
    res.render('admin/create-menu')
  } else {
    res.redirect('/admin/login')
  }
})

router.post('/create', uploads.single('picture'), (req, res)=>{
  const menu ={
    category: req.body.category,
    name: req.body.name,
    description: req.body.description,
    picture: req.file.filename,
    price: req.body.price

  }
  let sql = 'INSERT INTO menu ("name 1", category, description, picture, price) VALUES (?,?,?,?,?)'
connection.query(
  sql,
  [menu.name,
    menu.category,
    menu.description,
    menu.picture,
    menu.price
    
  ],

  (error, results)=>{
    console.log('menu item successfully added')
    res.redirect('/admin')
  }
)

})


module.exports = router;
