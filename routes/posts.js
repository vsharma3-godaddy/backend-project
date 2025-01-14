const express = require('express');
const router = express.Router();
const db = require('../database');

router.post('/', (req, res) => {
  const { user_id, title, content } = req.body;
  db.run('INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)', [user_id, title, content], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

router.get('/', (req, res) => {
  db.all('SELECT * FROM posts', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    try {
        const post = db.get('select * from posts where user_id = ?', [id]);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: "Database error" });
    }
});

router.put('/:id', (req, res) => {
  const { title, content } = req.body;
  db.run('UPDATE posts SET title = ?, content = ? WHERE id = ?', [title, content, req.params.id], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ changes: this.changes });
  });
});

router.delete('/:id', (req, res) => {
  db.run('DELETE FROM posts WHERE id = ?', [req.params.id], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ changes: this.changes });
  });
});

module.exports = router;
