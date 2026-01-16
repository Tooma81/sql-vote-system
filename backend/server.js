const express = require('express');
const mysql = require('mysql2'); 
const cors = require('cors');

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwerty',
    database: 'Haaletusysteem'
});

app.get('/api/votes', (req, res) => {
    const sql = "SELECT * FROM HAALETUS";
    db.query(sql, (err, results) => {
        if (err) return res.json(err);
        return res.json(results);
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});