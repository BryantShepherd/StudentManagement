const express = require('express');
const path = require('path');
const authentication = require('./routes/authenticator');
const studentManagement = require('./routes/management');
const registration = require('./routes/registration');
const app = express();
// Body Parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('views', './views');
app.set('view engine', 'pug');

// Serve static page
app.use(express.static(path.join(__dirname, 'public')));

// Authenticate user's login
app.use('/login', authentication);

app.use('/students', studentManagement);

// app.get('/', (req, res) => {
//   res.redirect('/students');
// });

// Establish connection
const PORT = process.env.port || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});