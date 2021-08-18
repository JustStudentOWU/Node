const fs = require('fs');
const filePath = __dirname + '/Users';

fs.mkdir(`${filePath}`, err => {
    if (err) console.log(err)
})

createUserFile = (user) => {
    fs.writeFile(`${filePath}/${user.name}.txt`, JSON.stringify(user), err => {
        if (err) console.log(err)
    } )
}

createUserDir = (name) => {
    fs.mkdir(`${filePath}/${name}`, {recursive: true}, err => {
        if(err) console.log(err)
    })
}

userVerification = (user, gender, age) => {
    if (gender === 'male' && age < 20){
        fs.rename(`${filePath}/${user.name}.txt`, `${filePath}/ManYounger20/${user.name}.txt`, err => {
            if(err) console.log(err)
        } )
    }
    if (gender === 'male' && age >= 20){
        fs.rename(`${filePath}/${user.name}.txt`, `${filePath}/ManOlder20/${user.name}.txt`, err => {
            if(err) console.log(err)
        } )
    }
    if (gender === 'female' && age < 20){
        fs.rename(`${filePath}/${user.name}.txt`, `${filePath}/WomanYounger20/${user.name}.txt`, err => {
            if(err) console.log(err)
        } )
    }
    if (gender === 'female' && age >= 20){
        fs.rename(`${filePath}/${user.name}.txt`, `${filePath}/WomanOlder20/${user.name}.txt`, err => {
            if(err) console.log(err)
        } )
    }
}

createUserDir('ManYounger20');
createUserDir('ManOlder20');
createUserDir('WomanYounger20');
createUserDir('WomanOlder20');

users = [
    {name: "Olya", gender: "female", age: 21},
    {name: "Valya", gender: "female", age: 22},
    {name: "Natasha", gender: "female", age: 23},
    {name: "Lena", gender: "female", age: 14},
    {name: "Ulya", gender: "female", age: 15},
    {name: "Vasya", gender: "male", age: 21},
    {name: "Petya", gender: "male", age: 22},
    {name: "Sasha", gender: "male", age: 23},
    {name: "Seryu", gender: "male", age: 14},
    {name: "Vitalik", gender: "male", age: 15}
]
for (const user of users) {
    createUserFile(user);
    userVerification(user, user.gender, user.age);
}
