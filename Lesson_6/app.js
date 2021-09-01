const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '.env')});

const app = express();

const { ERROR_MESSAGE, STATUS_CODES } = require('./constants');
const { VARIABLES: { DATABASE_CONNECT_URL, PORT } } = require('./config');
const { authRouter, userRouter } = require('./routers');

mongoose.connect(DATABASE_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({ extended : true}));

app.listen(PORT, () => {
    console.log('App listen', PORT);
});

function _notFoundError(err, req, res, next) {
    next({
        status: err.status || STATUS_CODES.NOT_FOUND,
        message: err.message || ERROR_MESSAGE.NOT_FOUND
    });
}

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
    res
        .status(err.status || STATUS_CODES.SERVER_ERROR)
        .json({ message: err.message });
}

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('*', _notFoundError);
app.use(_mainErrorHandler);
