const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const fs = require('fs');

// Get mongo connection string
const rawData = fs.readFileSync('./proceduce/serect_key.json');
const rawData_toJSON = JSON.parse(rawData);
const mongoConnString = rawData_toJSON['mongoString'];

mongoose.connect(mongoConnString, {
	useNewUrlParser: true,
});

const conn = mongoose.connection;

const User = conn.collection('users');

var signUp = (email, password, callback) => {
	let emailFinding = User.findOne(
		{ 
			email: email,
		},
		(error, result) => {
			if (error) {
				return callback('EFINDONE', error);
			}
			if (result) {
				return callback(null, 'account_exist');
			}
			User.insertOne(
				{
					email: email,
					password: password,
				},
				(error, result) => {
					if (error) {
						return callback('EADD', error);
					}
					callback(null, 'update success');
				}
			);
		}
	);
};

var signIn = (email, password, callback) => {
	let accountVerify = User.findOne(
		{
			email: email,
			password: password,
		},
		(error, result) => {
			if (error) {
				return callback(1, error, false);
			}
			if (result) {
				User.updateOne(
					{
						_id: result['_id'],
					},
					{
						$set: {
							status: 'ONLINE',
						},
					},
					() => {
						return callback(0, 'Sign in successfully', true, result);
					}
				);
			} else {
				return callback(3, 'Account is not exist', false);
			}
		}
	);
};

var signOut = (_id, callback) => {
	User.findOne({ "_id": ObjectId(_id)}, {"_id": 1}, (error, result) => {
        if(result && result["status"] === 'ONLINE'){
		User.updateOne(
			{
				_id: ObjectId(_id),
			},
			{
				$set: {
					status: 'OFFLINE',
				},
			},
			(err, result) => {
				if (err) {
					return callback(1, err, false);
				} else {
					return callback(0, 'Signout successfully', true);
				}
			}
        )} else if (result && result["status"] != 'ONLINE') {
            return callback(3, "Status is not Online", false);
        } else{
            return callback(3, "Object is not found", false)
        };
	});
};

// DEBUG function
// signUp('duclmq_3@gmail.com', 'hello', (err, result) => {
//     console.log('result= ${result}');
// });

// signIn('duclmq_3@gmail.com', 'hello', (errorCode, message, signin, userInfo) => {
//     console.log({
//         "errorCode": errorCode,
//         "message": message,
//         "signin": signin,
//         "userInfo": userInfo,
//     })
// })

// signOut('5caeea066bfcdd351c9a566f', (errorCode, message, signout) => {
// 	console.log({
// 		errorCode: errorCode,
// 		message: message,
// 		signout: signout,
// 	});
// });

module.exports = {
	signIn,
	signUp,
	signOut,
};
