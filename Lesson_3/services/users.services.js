const fs = require('fs');
const util = require('util');

const { DBPATH } = require ('../config/variables.js');

const readDb = util.promisify(fs.readFile);
const writeDb = util.promisify(fs.writeFile);

module.exports = {
    showUsers: async () => {
        const dbQuery = await readDb(DBPATH);

        return JSON.parse(dbQuery.toString());
    },

    userById: async (userId) => {
        const dbQuery = await readDb(DBPATH);
        const db = JSON.parse(dbQuery.toString());

        return db[userId];
    },

    createUser: async (authUser) => {
        const dbQuery = await readDb(DBPATH);
        const db = JSON.parse(dbQuery.toString());

        db.push(authUser);

        await writeDb(DBPATH, JSON.stringify(db));
    }
};
