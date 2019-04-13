const express = require('express');
const router = express.Router();

const { signIn: signIn , signUp, signOut } = require('../proceduce/login.js');

/* GET users listing. */
router.get('/', (req, res, next) => {
	res.send('respond with a resource');
});

/* GET check user and ->> create new account. */
router.get('/signup/:email/:password', (req, res) => {
	let email = req.params.email;
	let password = req.params.password;
	signUp(email, password, (err, result) => {
		res.send(result);
	});
});

/*GET check user and login */
router.get('/signin/:email/:password', (req, res) => {
	let email = req.params.email;
	let password = req.params.password;
	signIn(email, password, (errorCode, message, signin, userInfo) => {
		res.send({
			errorCode: errorCode,
			message: message,
			signin: signin,
			userInfo: userInfo,
		});
	});
});

router.get('/signout/:_id', (req, res) => {
	let _id = req.params._id;
	signOut(_id, (errorCode, message, signout) => {
		res.send({
			errorCode: errorCode,
			message: message,
			signout: signout,
		});
	});
});

module.exports = router;
