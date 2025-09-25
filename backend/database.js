const sqlite3 = require('sqlite3').verbose();

// Connect to a database file. If the file does not exist, it will be created.
const db = new sqlite3.Database('./questions.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the questions database.');
});

// Create the questions table if it doesn't exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    directed_to TEXT,
    votes INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Questions table is ready.");
  });
});

module.exports = db;