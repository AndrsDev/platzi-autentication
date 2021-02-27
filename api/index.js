const express = require('express');
const jwt = require('jsonwebtoken');
const { config } = require('./config');

const app = express();

//Add middleware
app.use(express.json());

app.post('/api/auth/token', function(req, res) {
  const { email, username, name } = req.body;
  const payload = { 
    sub: username, 
    email, 
    name, 
  };
  const options = { algorithm: 'RS256' }

  //Sign the token with the secret key
  //https://siddharthac6.medium.com/json-web-token-jwt-the-right-way-of-implementing-with-node-js-65b8915d550e
  const token = jwt.sign(payload, config.AUTH_JWT_SECRET, options)

  res.json({ access_token: token })
});

app.get('/api/auth/verify', function(req, res, next) {
  const bearer = req.headers['authorization'];
  const access_token = bearer.split(' ')[1];

  try {
    const decoded = jwt.verify(access_token, config.AUTH_JWT_PUBLIC)
    res.json({ 
      message: "The access token is valid.", 
      username: decoded.sub 
    });
  } catch (err) {
    next(err);
  }
});


const server = app.listen(5000, function() {
  console.log(`Listening http://localhost:${server.address().port}`)
})