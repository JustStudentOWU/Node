const express = require('express');

const app = express();

const { PORT } = require('./config/variables');
const { usersRouter, authRouter } = require('./routers');

app.use(express.json());
app.use(express.urlencoded({ extended : true}));

app.listen(PORT, () => {
    console.log('App listen', PORT);
});

app.use('/users', usersRouter);
app.use('/auth', authRouter);
