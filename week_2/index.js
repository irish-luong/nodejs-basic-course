/* 
Task 01
Create new project folder (you are free to choose its name)
Use npm init to create a package.json and a new Node.js project from scratch
Create index.js in the project folder and write some code to satisfy below test case
Try to run the project with node command in terminal
The Node.js app must satisfy following test case:
*/


// const readline = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// var getAge = dob => {
//     return new Date().getFullYear() - new Date(dob).getFullYear();
// };

// var reply;
// readline.question(`what is your name: `, name => {
//     reply = `🍀 Hello ${name}, `;
//     readline.question('What is your date of birth (YYYY-MM-DD)', dob => {
//         let age = getAge(dob);
//         reply += `so you are ${age} year old `;
//         readline.question('What is your home town?', town => {
//             reply += `and from ${town}.`;
//             console.log(reply);
//         });
//     });
// });


/*
Task 02
Use fs.readFile() to read the products.json file and convert it to JS object.
Print the total number of products to console.
Convert dateUpdated of each item into real Date. (same property name)
Hint: Using Array.prototype.forEach and Date() constructor
Install date-fns@next (2.x-alpha version) into the project
Print the list to the console with following template for each product:
${name} - ${price}VND - Cập nhật cách đây: ${fromNow}
Format the price with comma (,) as thousand separators. (Google for a snippet)
Use date-fns formatDistance to convert dateUpdated to fromNow with Vietnamese locale
*/



/*
Use fs.readFile() to read the products.json file and convert it to JS object.
*/
//Require fs
const fs = require('fs');

// Readfile JSON and convert to Object with JSON.parse
var readJson = (pathToFile, callback) => {
    fs.readFile(pathToFile, (err, data) => {
        if (err) throw err;
        callback(JSON.parse(data));
    })
};
// //Test to debug
// readJson('./product.json', (data)=> {
//     console.log(data);
// });

// /* Count total product by name */
// var countAll = (arr, field) => {
//     let countResult = {}
//     arr.forEach((obj) => {
//         let keys = Object.getOwnPropertyNames(obj);
//         keys.forEach(async (element) => {
//             if (countResult.hasOwnProperty(element)) {
//                 countResult[element]["countAll"]++;
//                 if (countResult[element]["items"].includes(obj[element]) === false) {
//                     countResult[element]["countDistinct"]++;
//                     countResult[element]["items"].push(obj[element]);
//                 }
//             } else {
//                 countResult[element] = {
//                     "countAll": 1,
//                     "countDistinct": 1,
//                     "items": [obj[element]]
//                 }
//             }
//         });
//     });
//     if (countResult.hasOwnProperty(field)){
//         return(countResult[field]);
//     } else{
//         return ("Field is not find");
//     }
    
// }

// //type in count_all or count_distinct
// var countByAttribute = (pathToFile, field) => {
//     readJson(pathToFile, (data) => {
//         console.log(countAll(data, field));
//     })
// }
// countByAttribute('./product.json', 'name');

// var formatDistance = require('date-fns/formatDistance');
// var viLocale = require('date-fns/locale/vi')
// var numFormat = new Intl.NumberFormat();

// var formatInfo = (pathToFile) => {
//     readJson(pathToFile, (data) => {
//         data.forEach((element) => {
//             let fromNow = formatDistance(new Date(element["dateUpdated"]), new Date , {locale: viLocale});
//             let price = numFormat.format(element["price"] * 1000);
//             console.log(`${element["id"]} - ${element["name"]} - ${price}VND - Cập nhật cách đây ${fromNow}`);
//         });
//     })
// };

// formatInfo('./product.json');

/*
TASK 3
Create new field updated from dateUpdated with following format: MM/DD/YYYY (use date-fns)
Delete dateUpdated field (we don't want to generate this column later to Excel)
Install xlsx into the previously created project
Use xlsx library to convert products.json to a Microsoft Excel file buffer
Write the buffer to hard drive as products.xlsx and should be able to open in Excel.
*/

var format = require('date-fns/format');
var viLocale = require('date-fns/locale/vi');
var XLSX = require('xlsx');
var a = [
    {
    "id": "3501",
    "name": "Rustic Rubber Chair",
    "price": 59000,
    "category": "Mouse",
    "dateUpdated": "Mon Jan 01 2018 00:00:00 GMT+0100 (CET)"
    },
    {
    "id": "3069",
    "name": "Sleek Concrete Chips",
    "price": 105000,
    "category": "Car",
    "dateUpdated": "Mon Jan 01 2018 00:00:00 GMT+0100 (CET)"
    }]


var exportExcelFromJson = (importFile, exportFile) => {
    readJson(importFile, (data) => {
        data.forEach((element) => {
            element["updated"] = (format( new Date(element["dateUpdated"]), 'MM/dd/yyyy', {locale: viLocale}));
            delete element.dateUpdated;
        })
        var ws = XLSX.utils.json_to_sheet(data);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws)
        console.log(ws);
        XLSX.writeFile(wb, exportFile);
        console.log("done");
    })
};
exportExcelFromJson("product.json", "data.xlsx");


