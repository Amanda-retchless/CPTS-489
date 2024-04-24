const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const db = new sqlite3.Database('signatures.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the signatures database.');
});

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS signatures (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, comments TEXT)', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Created the signatures table.');
  });
});

app.get('/signatures', (req, res) => {
  db.all('SELECT * FROM signatures', [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

app.post('/signatures', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const comments = req.body.comments;

  db.run('INSERT INTO signatures (name, email, comments) VALUES (?, ?, ?)', [name, email, comments], function(err) {
    if (err) {
      return console.error(err.message);
    }
    res.json({ id: this.lastID, name, email, comments });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});