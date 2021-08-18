const fs = require('fs');
const path = require('path');

const boysDir = path.join(__dirname,'1800');
const girlsDir = path.join(__dirname,'2000');

function sortingByGender(boysDir, girlsDir) {
    fs.readdir(boysDir, (err, files) => {
        if (err) {
            console.log(err);
            return
        }

        files.forEach((file) => {
            fs.readFile(path.join(boysDir,`${file}`),((err1, data) => {
                if(err1) {
                    console.log(err1);
                    return
                }

                const search = data.toString().search(('"gender": "female"'));
                if (search !== -1) {
                    fs.rename(path.join(boysDir,`${file}`), path.join(girlsDir,`${file}`), err2 => {
                        if(err2) {
                            console.log(err2);
                        }
                    })
                }
            }))
        })
    })
    fs.readdir(girlsDir, (err, files) => {
        if(err) {
            console.log(err);
            return
        }

        files.forEach((file) => {
            fs.readFile(path.join(girlsDir, `${file}`),((err1, data) => {
                if (err1) {
                    console.log(err1);
                    return
                }

                const search = data.toString().search(('"gender": "male"'));
                if (search !== -1) {
                    fs.rename(path.join(girlsDir, `${file}`), path.join(boysDir, `${file}`), err2 => {
                        console.log(err2)
                    })
                }
            }))
        })
    })
}

sortingByGender(boysDir, girlsDir);
