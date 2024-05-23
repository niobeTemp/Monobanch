const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const app = express();
router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
// router.get('/login', (req, res) => res.render('login'));
router.post('/login', authController.login_post);
// app.post('/login', (req, res, next)=>{
// res.render('signup');
// });

module.exports = router;