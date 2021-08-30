const express = require('express');
const mongoose = require('mongoose');

const app = express();

const { STATUS_CODES, ERROR_MESSAGE} = require('./constants');
const { PORT, DATABASE } = require('./config/variables');
const { authRouter, carRouter, userRouter } = require('./routers');

mongoose.connect(DATABASE);

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
app.use('/cars', carRouter);
app.use('/users', userRouter);
app.use('*', _notFoundError);
app.use(_mainErrorHandler);
