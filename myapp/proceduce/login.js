const mongoose = require('mongoose');
const fs = require('fs');

// Get mongo connection string 
const rawData = fs.readFileSync('./proceduce/serect_key.json');
const rawData_toJSON = JSON.parse(rawData);
const mongoConnString = rawData_toJSON["mongoString"];

mongoose.connect(mongoConnString, {
    useNewUrlParser: true
});

const conn = mongoose.connection;

const User = conn.collection('users');

var signUp = (email, password, callback) => {
    let emailFinding = User.findOne({
        "email": email
    }, (error, result) => {
        if (error) {
            return callback('EFINDONE', error);
        }
        if (result) {
            return callback(null, "account_exist");
        }
        User.insertOne({
            "email": email,
            "password": password,
        }, (error, result) => {
            if (error) {
                return callback('EADD', error);
            }
            callback(null, "update success")
        })
    })
};

// DEBUG function
// signUp('duclmq_3@gmail.com', 'hello', (err, result) => {
//     console.log('result= ${result}');
// });

module.exports = signUp;