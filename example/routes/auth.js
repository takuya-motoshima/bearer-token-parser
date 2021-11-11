const express = require('express');
const router = express.Router();
const {BearerParser, BearerValidator} = require('../../dist/build.common');
// const {BearerParser, BearerValidator} = require('bearer-token-parser');

/**
 * Token authentication.
 */
router.get('/', [
  // Validate Bearer tokens.
  BearerValidator.validation({
    realm: 'Sample API',
    tokenCheckCallback: token => {
      // Returns TRUE if the token is correct.
      return token === 'eTRPXY8F~np0zbAzi2~KN';
    }
  })
], (req, res) => {
  // Get bearer token.
  // It gets a token68 format token from the authorization header of the request.
  const token = BearerParser.parseBearerToken(req.headers);
  console.log(`token=${token}`);
  res.send('Authentication was successful');
});

/**
 * Get tokens without authenticating.
 */
 router.get('/parse', (req, res) => {
  const token = BearerParser.parseBearerToken(req.headers);
  console.log(`token=${token}`);
  res.send(`The token obtained is ${token||'undefined'}`);
});

module.exports = router;