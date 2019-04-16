const students = [{
        "name": 'Nam',
        "age": 24,
        "gender": 'male',
    },
    {
        "name": 'Mai',
        "age": 22,
        "gender": 'female',
    },
    {
        "name": 'Trang',
        "age": 23,
        "gender": 'female',
    },
    {
        "name": 'An',
        "age": 20,
        "gender": 'male',
    },
    {
        "name": 'Thien',
        "age": 27,
        "gender": 'male',
    },
];
var maleCount = femaleCount = 0;

students.forEach((prop) => {
    if (prop["gender"] === 'male') {
        maleCount++;
    } else if (prop["gender"] === 'female') {
        femaleCount++;
    } else {
        console.log('gender not found');
    }
})
console.log(maleCount);
console.log(femaleCount);