const path = require('path');

module.exports = {
    PORT : 5000,
    DBPATH : path.join(process.cwd(), 'db', 'users.json')
};
