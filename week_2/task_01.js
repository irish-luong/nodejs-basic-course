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
readline.question(`what is your name: `, (name) => {
    readline.question('What is your date of birth (YYYY-MM-DD)', dob => {
        readline.question('What is your home town?', town => {
            console.log(`🍀 Hello ${name}, so you are ${getAge(dob)} year old and from ${town}.🍀`);
        });
    });
});
};

task_1()