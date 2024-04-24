const express = require('express');
const app = express();
const path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/sign', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const comments = req.body.comments;

  if (!validateEmail(email)) {
    res.status(400).send('Invalid email address');
    return;
  }

  addSignature(name, email, comments);

  res.status(200).send('Signature added');
});

app.get('/signatures', (req, res) => {
  const signatures = getSignatures();

  res.json(signatures);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

