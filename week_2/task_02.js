const fs = require('fs');
var formatDistance = require('date-fns/formatDistance');
var viLocale = require('date-fns/locale/vi')
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
        return (countResult[field]);
    } else {
        return ("Field is not find");
    }

}

//type in count_all or count_distinct
var task_2_1 = (pathToFile, field) => {
    readJson(pathToFile, (data) => {
        console.log(countAll(data, field));
    })
}

var taks_2_2 = (pathToFile) => {
    readJson(pathToFile, (data) => {
        data.forEach((element) => {
            let fromNow = formatDistance(new Date(element["dateUpdated"]), new Date, {
                locale: viLocale
            });
            let price = numFormat.format(element["price"] * 1000);
            console.log(`${element["id"]} - ${element["name"]} - ${price}VND - Cập nhật cách đây ${fromNow}`);
        });
    })
};


task_2_1('./product.json', 'name');
taks_2_2('./product.json');