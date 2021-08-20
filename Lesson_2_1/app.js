const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');

const { PORT } = require('./config/variables');
const db = path.join('db', 'users.txt');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({ defaultLayout: false }));
app.set('views', path.join(__dirname, 'static'));

app.listen(PORT, () => {
    console.log('App listen', PORT);
});

app.get('/registration', (req, res) => {
    res.render('registration');
});

app.post('/registration', (req, res) => {
    fs.readFile(db, (err, data) => {
        if(err) {
            console.log(err);
            return;
        }

        const { email } = req.body;
        const users = JSON.parse(data.toString());

        if(users.find(user => user.email === email)) {
            res.render('errors', { emailFalse: true });
            return;
        }

        users.push(req.body);
        fs.writeFile(db, JSON.stringify(users), err1 => {
            if(err1) {
                console.log(err1);
                return;
            }

            res.redirect('/login');
        });
    });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    fs.readFile(db, (err, data) => {
        if(err) {
            console.log(err);
            return;
        }

        const { email, password } = req.body;
        const users = JSON.parse(data.toString());
        const search = users.findIndex(user => user.email === email && user.password === password);

        if (search === -1) {
            res.render('errors', { loginFalse: true });
            return;
        }

        res.redirect('/users');
    });
});

app.get('/users', (req, res) => {
    fs.readFile(db, (err, data) => {
        if(err) {
            console.log(err);
            return;
        }

        const users = JSON.parse(data.toString());
        res.render('users', { users });
    });
});

app.get('/users/:user_id', (req, res) => {
    fs.readFile(db, (err, data) => {
        if(err) {
            console.log(err);
            return;
        }

        const users = JSON.parse(data.toString());
        const { user_id } = req.params;
        const user = users[user_id];

        if(!user) {
            res.render('errors', { userFalse : 'userFalse' });
        }

        res.render('userId', { user })
    })
})
