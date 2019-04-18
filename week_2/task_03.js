const format = require('date-fns/format');
const viLocale = require('date-fns/locale/vi');
const XLSX = require('xlsx');
const fs = require('fs');


var readJson = (pathToFile, callback) => {
    fs.readFile(pathToFile, (err, data) => {
        if (err) throw err;
        callback(JSON.parse(data));
    })
};

var task_3 = (importFile, exportFile) => {
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


task_3("product.json", "data.xlsx");