const fs = require('fs');
const util = require('util');

const { DBPATH } = require ('../config/variables.js');

const readDb = util.promisify(fs.readFile);

module.exports = {
    findAuthUser: async (email, password) => {
        const dbQuery = await readDb(DBPATH);
        const db = JSON.parse(dbQuery.toString());

        return db.findIndex(user => user.email === email && user.password === password);
    }
};
