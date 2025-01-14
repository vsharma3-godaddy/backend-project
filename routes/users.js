const express = require('express');
const router = express.Router();
const db = require('../database');

router.post('/', (req, res) => {
    const { name, email } = req.body;
    db.run('insert into users (name, email) values (?, ?)', [name, email], function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID });
    });
});

router.get('/', (req, res) => {
    db.all('select * from users', [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

router.put('/:id', (req, res) => {
    const { name, email } = req.body;
    db.run('update users set name = ?, email = ? where id = ?', [name, email, req.params.id], function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ changes: this.changes });
    });
});

router.delete('/:id', (req, res) => {
    db.run('delete from users where id = ?', [req.params.id], function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ changes: this.changes });
    });
});

module.exports = router;