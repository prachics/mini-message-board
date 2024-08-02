// app.js

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Define the messages array with sample messages
const messages = [
  { text: 'Hi there!', user: 'Amando', added: new Date() },
  { text: 'Hello World!', user: 'Charles', added: new Date() }
];

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Mini Message Board', messages: messages });
});

app.get('/new', (req, res) => {
  res.render('form', { title: 'New Message' });
});
app.get('/message/:id', (req, res) => {
    const message = messages[req.params.id];
    res.render('message', { title: 'Message Details', message: message });
  });
  
app.post('/new', (req, res) => {
  const { messageText, userName } = req.body;
  messages.push({ text: messageText, user: userName, added: new Date() });
  res.redirect('/');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
