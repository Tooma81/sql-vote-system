const express = require('express');
const mysql = require('mysql2'); 
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors())


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

app.get('/api/results', (req, res) => {
    const sql = "SELECT * FROM TULEMUSED";
    db.query(sql, (err, results) => {
        if (err) return res.json(err);
        return res.json(results);
    });
});

app.get('/api/lastresult', (req, res) => {
    const sql = "SELECT * FROM TULEMUSED ORDER BY id DESC LIMIT 1";
    db.query(sql, (err, results) => {
        if (err) return res.json(err);
        return res.json(results);
    });
});

// PUT meetod hääle uuendamiseks
app.put('/api/haaleta/:id/:otsus', (req, res) => {
    const { id, otsus } = req.params;

    const sql = "UPDATE HAALETUS SET otsus = ? WHERE id = ?";
    
    db.query(sql, [otsus, id], (err, result) => {
        if (err) {
            console.error("Viga andmebaasis:", err);
            return res.status(500).json({ error: "Hääle salvestamine ebaõnnestus" });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Hääletajat ei leitud" });
        }

        res.json({ message: "Hääl edukalt salvestatud!" });
    });
});

app.put('/api/votes/start', (req, res) => {

    const sql = "CALL ALUSTA_HAALETUS";
    
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Viga andmebaasis:", err);
            return res.status(500).json({ error: "Hääletuse alustamine ebaõnnestus" });
        }

        res.json({ message: "Hääletus edukalt alustatud!" });
    });
});

app.put('/api/votes/reset', (req, res) => {

    const sql = "CALL LAHESTA_HAALETUS";
    
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Viga andmebaasis:", err);
            return res.status(500).json({ error: "Häälte lähestamine ebaõnnestus" });
        }

        res.json({ message: "Hääled edukalt lähestatud!" });
    });
});

app.put('/api/votes/finish', (req, res) => {

    const sql = "CALL ARVUTA_TULEMUS";
    
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Viga andmebaasis:", err);
            return res.status(500).json({ error: "Tulemuste arvutamine ebaõnnestus" });
        }

        res.json({ message: "Tulemused edukalt arvutatud" });
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});