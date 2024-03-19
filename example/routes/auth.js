const router = require('express').Router();
const {BearerParser, BearerValidator} = require('../../dist/build.common');
// const {BearerParser, BearerValidator} = require('bearer-token-parser');

router.get('/', [
  // Token authentication middleware initialization.
  BearerValidator.validation({
    realm: 'myapi',
    tokenCheckCallback: token => {
      // Return `TRUE` if the token is correct.
      // If you return `FALSE`, a `401` error will be returned by the `BearerValidator.validation` middleware.
      return token === 'mytoken123';
    }
  })
], (req, res) => {
  // Get bearer token.
  const token = BearerParser.parseBearerToken(req.headers);
  res.send('Authentication was successful');
});

router.get('/parse', (req, res) => {
  const token = BearerParser.parseBearerToken(req.headers);
  res.send(`The token obtained is ${token||'undefined'}`);
});

module.exports = router;