const express = require('express');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
const router = express.Router();

const { db } = require('./database/config');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());




// serv index.html
router.get('/', (req, res) => {
    res.sendFile('index.html');
});

// send all users from db
app.get('/api/users', (req, res) => {
    const query = `SELECT * FROM users;`;
    db.all(query, (err, users) => {
        if (err) {
            console.log(err.message);
        } else {
            res.send(users);
        }
    })
});

// get user by id from db
router.get('/api/users/:id', (req, res) => {
    const id = req.params.id

    const query = `SELECT * FROM users WHERE id=?;`;
    db.get(query, id, (err, user) => {
        if (err) {

            console.log(err);
            return;
        }
        if (!user) {
            res.status(404).send({ message: 'ID not exist' });
        } else {
            res.send(user);
        }
    });
});
//======

// Add a new user
app.post('/api/users', (req, res) => {
    // Validation
    if (!(req.body.firstName && req.body.lastName && req.body.email && req.body.password)) {
        res.status(400).send({ message: 'User details are not valid' });
        return;
    }
    user = {
        id: uuidv4(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }
    users.push(user);
    res.send(user);
});

// Update user
app.put('/api/users/:id', (req, res) => {
    // check if user not exist
    user = users.filter(u => u.id === req.params.id)[0];
    if (!user) res.status(404).send({ message: 'User not found' });
    // validation
    if (!(req.body.firstName && req.body.lastName && req.body.email && req.body.password)) {
        res.status(400).send({ message: 'User details are not valid' });
        return;
    }
    // update user

})






app.use('/', router);
const port = process.env.PORT || 3000;

app.listen(port);