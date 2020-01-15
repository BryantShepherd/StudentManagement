const express = require('express');
const path = require('path');
const authentication = require('./authenticator');

const app = express();
// Body Parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Serve static page
app.use(express.static(path.join(__dirname, 'public')));

// Authenticate user's login
app.use('/authenticate', authentication);





// Establish connection
const PORT = process.env.port || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});