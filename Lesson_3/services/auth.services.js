const fs = require('fs');
const path = require('path');
const util = require('util');

const dbPath = path.join(process.cwd(), 'db', 'users.json');

const readDb = util.promisify(fs.readFile);

module.exports = {
    findAuthUser: async (email, password) => {
        const dbQuery = await readDb(dbPath);
        const db = JSON.parse(dbQuery.toString());

        return db.findIndex(user => user.email === email && user.password === password);
    }
};
