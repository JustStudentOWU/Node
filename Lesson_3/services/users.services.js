const fs = require('fs');
const path = require('path');
const util = require('util');

const dbPath = path.join(process.cwd(), 'db', 'users.json');

const readDb = util.promisify(fs.readFile);
const writeDb = util.promisify(fs.writeFile);

module.exports = {
    showUsers: async () => {
        const dbQuery = await readDb(dbPath);

        return JSON.parse(dbQuery.toString());
    },
    userById: async (userId) => {
        const dbQuery = await readDb(dbPath);
        const db = JSON.parse(dbQuery.toString());

        return db[userId];
    },
    createUser: async (authUser) => {
        const dbQuery = await readDb(dbPath);
        const db = JSON.parse(dbQuery.toString());

        db.push(authUser);

        await writeDb(dbPath, JSON.stringify(db));
    }
};
