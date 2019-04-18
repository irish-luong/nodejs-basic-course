
// TASK_1
/*Import libary readline for submit informations from command line */
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Fucntion get time gap between current date to a specific date
var getAge = dob => {
    return new Date().getFullYear() - new Date(dob).getFullYear();
};

var task_1 = () => {
    let promise = new Promise((resolve, reject) => {
        readline.question(`what is your name: `, (name) => {
            readline.question('What is your date of birth (YYYY-MM-DD)', (dob) => {
                readline.question('What is your home town?', (town) => {
                    console.log (`🍀 Hello ${name}, so you are ${getAge(dob)} year old and from ${town}.🍀`);
                    return resolve(`🍀 Hello ${name}, so you are ${getAge(dob)} year old and from ${town}.🍀`);
                });
            });
        });
    });

    return promise;
};

//TASK_2
const fs = require('fs');
var formatDistance = require('date-fns/formatDistance');
var numFormat = new Intl.NumberFormat();

// Readfile JSON and convert to Object with JSON.parse
var readJson = (pathToFile, callback) => {
    fs.readFile(pathToFile, (err, data) => {
        if (err) throw err;
        callback(JSON.parse(data));
    })
};

/* Count and group by every attribute */
var countAll = (arr, field) => {
    let countResult = {}
    arr.forEach((obj) => {
        let keys = Object.getOwnPropertyNames(obj);
        keys.forEach(async (element) => {
            if (countResult.hasOwnProperty(element)) {
                countResult[element]["countAll"]++;
                if (countResult[element]["items"].includes(obj[element]) === false) {
                    countResult[element]["countDistinct"]++;
                    countResult[element]["items"].push(obj[element]);
                }
            } else {
                countResult[element] = {
                    "countAll": 1,
                    "countDistinct": 1,
                    "items": [obj[element]]
                }
            }
        });
    });
    if (countResult.hasOwnProperty(field)) {
        return (countResult[field]["countDistinct"]);
    } else {
        return ("Field is not find");
    }

}

//type in count_all or count_distinct
var task_2_1 = (pathToFile, field) => {
    let promise = new Promise((resolve, reject)=> {
        readJson(pathToFile, (data) => {
            let result = (countAll(data, field));
            return resolve(result);
        });
    });
    return promise;
}

var taks_2_2 = (pathToFile) => {
    let promise = new Promise((resolve, reject) => {
        readJson(pathToFile, (data) => {
            let description = [];
            data.forEach((element) => {
                let fromNow = formatDistance(new Date(element["dateUpdated"]), new Date, {
                    locale: viLocale
                });
                let price = numFormat.format(element["price"] * 1000);
                description.push(`${element["id"]} - ${element["name"]} - ${price}VND - Cập nhật cách đây ${fromNow}`);
            });
            return resolve(description);
        })
    })
    return promise;
};

//TASK_3

const format = require('date-fns/format');
const viLocale = require('date-fns/locale/vi');
const XLSX = require('xlsx');

var readJson = (pathToFile, callback) => {
    fs.readFile(pathToFile, (err, data) => {
        if (err) throw err;
        callback(JSON.parse(data));
    })
};

var task_3 = (importFile, exportFile) => {
    let promise = new Promise((resolve, reject) => {
        readJson(importFile, (data) => {
            data.forEach((element) => {
                element["updated"] = (format( new Date(element["dateUpdated"]), 'MM/dd/yyyy', {locale: viLocale}));
                delete element.dateUpdated;
            })
            var ws = XLSX.utils.json_to_sheet(data);
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws)
            XLSX.writeFile(wb, exportFile);
            return resolve(ws);
        });
    });
    return promise;
};


// DEBUG
var debug =  async () => {
    await task_1();
    var task_2 = await task_2_1('./product.json', 'name');
    console.log(task_2);
    var task_2_2_run = await taks_2_2('./product.json');
    console.log(task_2_2_run);
    // console.log('Done task_2_2_run');
    var task_3_run = await task_3("product.json", "data.xlsx");
    console.log(task_3_run);
    // console.log('Done task_3_run');
};
debug()

