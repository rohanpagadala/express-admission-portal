const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const applicants = [];

app.get('/', (req, res) => {
  res.redirect('/admission');
});

app.get('/admission', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'form.html'));
});

app.post('/submit', (req, res) => {
  const { fullname, email, phone, course } = req.body;
  applicants.push({ fullname, email, phone, course });
  res.send(`
    <html>
      <head>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <div class="nav">
          <a href="/admission">Apply</a>
          <a href="/admin">Admin</a>
        </div>
        <div class="container">
          <h2>Thank you, ${fullname}!</h2>
          <p>You’ve successfully applied for the <strong>${course}</strong> program.</p>
          <a href="/admission" class="btn">Apply Another</a>
        </div>
      </body>
    </html>
  `);
});

app.get('/admin', (req, res) => {
  const listItems = applicants.map((a, i) =>
    `<li><strong>${i + 1}. ${a.fullname}</strong> (${a.email}, ${a.phone}) - ${a.course}</li>`
  ).join('');
  res.send(`
    <html>
      <head>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <div class="nav">
          <a href="/admission">Apply</a>
          <a href="/admin">Admin</a>
        </div>
        <div class="container">
          <h2>All Applications</h2>
          <ul>${listItems || '<p>No applications yet.</p>'}</ul>
        </div>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/admission`);
});
