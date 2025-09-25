const express = require('express');
const db = require('./database.js');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// API Endpoints

// GET /api/questions - Retrieve all questions, ordered by votes
app.get('/api/questions', (req, res) => {
  const sql = "SELECT * FROM questions ORDER BY votes DESC";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": rows
    });
  });
});

// POST /api/questions - Create a new anonymous question
app.post('/api/questions', (req, res) => {
    const { text, directed_to } = req.body;
    if (!text) {
        res.status(400).json({ "error": "Question text is required." });
        return;
    }

    const sql = 'INSERT INTO questions (text, directed_to) VALUES (?, ?)';
    db.run(sql, [text, directed_to], function(err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": { id: this.lastID, text: text, directed_to: directed_to, votes: 0 }
        });
    });
});

// POST /api/questions/:id/upvote - Upvote a question
app.post('/api/questions/:id/upvote', (req, res) => {
    const sql = 'UPDATE questions SET votes = votes + 1 WHERE id = ?';
    db.run(sql, [req.params.id], function(err) {
        if (err) {
            res.status(400).json({ "error": res.message });
            return;
        }
        res.json({ message: "success", changes: this.changes });
    });
});

// POST /api/questions/:id/downvote - Downvote a question
app.post('/api/questions/:id/downvote', (req, res) => {
    const sql = 'UPDATE questions SET votes = votes - 1 WHERE id = ?';
    db.run(sql, [req.params.id], function(err) {
        if (err) {
            res.status(400).json({ "error": res.message });
            return;
        }
        res.json({ message: "success", changes: this.changes });
    });
});

// DELETE /api/questions/:id - Delete a question
app.delete('/api/questions/:id', (req, res) => {
    const sql = 'DELETE FROM questions WHERE id = ?';
    db.run(sql, [req.params.id], function(err) {
        if (err) {
            res.status(400).json({ "error": res.message });
            return;
        }
        res.json({ message: "deleted", changes: this.changes });
    });
});


// Default response for any other request
app.use(function(req, res){
    res.status(404);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});