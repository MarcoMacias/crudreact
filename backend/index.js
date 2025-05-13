const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/items', (req, res) => {
  db.all('SELECT * FROM items', (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

app.post('/items', (req, res) => {
  const { text } = req.body;
  db.run('INSERT INTO items (text) VALUES (?)', [text], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ id: this.lastID, text });
  });
});

app.put('/items/:id', (req, res) => {
  const { text } = req.body;
  db.run('UPDATE items SET text = ? WHERE id = ?', [text, req.params.id], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ updated: this.changes });
  });
});

app.delete('/items/:id', (req, res) => {
  db.run('DELETE FROM items WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ deleted: this.changes });
  });
});

app.listen(3001, () => {
  console.log('API rodando em http://localhost:3001');
});
