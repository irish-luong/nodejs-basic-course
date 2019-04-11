const express = require('express');
const router = express.Router();

const signUp = require('../proceduce/login.js');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup/:email/:password', function (req, res) {
  let email = req.params.email;
  let password = req.params.password;
  signUp(email, password, (err, result) => {
    res.send(result);
  });
});




module.exports = router;