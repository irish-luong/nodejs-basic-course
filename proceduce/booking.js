const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const fs = require('fs');
const randomstring = require('randomstring');
const format = require('date-fns/format')
// const viLocale = require('date-fns/locale/vi');



// Get mongo connection string
const rawData = fs.readFileSync('./serect_key.json');
const rawData_toJSON = JSON.parse(rawData);
const mongoConnString = rawData_toJSON['mongoString'];

mongoose.connect(mongoConnString, {
	useNewUrlParser: true,
});

const conn = mongoose.connection;

const Booking = conn.collection('booking');

const input = {
    'primary_info': {
        'name': 'Giày da',
        'description': 'Làm bằng da',
        'branch': 'No  branch'
    },
    'sale_info': {
        'price': 50000,
        'amount': 50
    },
    'image': {
        'image_1': 'image'
    },
    'transportation': {
        'weight': 50,
        'dimension': {
            'width': 50,
            'length': 60,
            'height': 100
        },
        'shipping fee': 30
    },
    'other': {
        'status': 'new'
    }
} 
var createOrder = async (obj) => {
    schemaField = ['primary_info', 'sale_info', 'image' , 'transportation', 'other']
    try {
    var checkField = await checkKeysInObj(obj, schemaField);
    Booking.insertOne({
        'primary_info': obj['primary_info'],
        'sale_info': obj['sale_info'],
        'image': obj['image'],
        'transportation': obj['transportation'],
        'other': obj['other']
    }, (error, result) => {
        if (error) { 
            console.log (error);
        } else {
            console.log(result);
        }

    })  
} catch(e){
    console.log(e);
}}

var checkKeysInObj = (obj, keys) => {
    let promise = new Promise( (resolve, reject) => {
        if ( typeof obj != 'object') {
            return reject(-1);
        };
        let propList = [];
        for (prop in obj){propList.push(prop)};
        for (i = 0; i < keys.length; i++) {
    
            if ( !propList.includes(keys[i]) ){
                return reject(0);
                break;
            }
        };
        return resolve(1);
    })
    return promise;

}

// createOrder(input);

// checkKeysInObj(input, (errcode, message) => { console.log(errcode, message)}, 'transportation', 'sale_info');
// checkKeysInObj('input', (errcode, message) => { console.log(errcode, message)}, 'transportation', 'sale_info');
// checkKeysInObj(input, (errcode, message) => { console.log(errcode, message)}, 'extra', 'extro');

console.log(new Date());