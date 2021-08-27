const express = require('express');
const mongoose = require('mongoose');

const app = express();

const { PORT } = require('./config/variables');
const { authRouter, carRouter, userRouter } = require('./routers');

mongoose.connect('mongodb://localhost:27017/apr-2021');

app.use(express.json());
app.use(express.urlencoded({ extended : true}));

app.listen(PORT, () => {
    console.log('App listen', PORT);
});

function _notFoundError(err, req, res, next) {
    next({
        status: err.status || 404,
        message: err.message || 'Not found'
    });
}

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
    res
        .status(err.status || 500)
        .json({ message: err.message });
}

app.use('/auth', authRouter);
app.use('/cars', carRouter);
app.use('/users', userRouter);
app.use('*', _notFoundError);
app.use(_mainErrorHandler);
