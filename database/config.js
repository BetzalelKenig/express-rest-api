const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const users_db_path = path.join(__dirname, "users.db");

const db = new sqlite3.Database(users_db_path, err => {
    if (err) {
        console.log(err.message);
    } else
        console.log("Connected to DB");
})

exports.db = db;