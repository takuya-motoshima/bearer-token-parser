# bearer-token-parser

This includes:  
A generic Bearer token parsing module.  
A module that validates Bearer tokens in the Express framework.

## Installation

Install.

```sh
npm install bearer-token-parser;
```

## API
See [API.md](./API.md) for API reference.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).

## Examples

There are some examples in "./examples" in this package.Here is the first one to get you started.

![example.png](https://raw.githubusercontent.com/takuya-motoshima/bearer-token-parser/main/screencap/example.png)

## Usage

### Parse Bearer token.

An example of an Express framework.  
BearerParser can also be used with other frameworks.

```js
import express from 'express';
import { BearerParser } from 'bearer-token-parser';

const router = express.Router();
router.post('/', async (req, res, next) => {

  // Get bearer token.
  // It gets a token68 format token from the authorization header of the request.
  const token = BearerParser.parseBearerToken(req.headers);
  console.log(`Token: ${token}`);// eTRPXY8F~np0zbAzi2~KN

  // Processing something.
  // ...

  // Respond.
  res.json(true);
});

// mount the router on the app
app.use('/', router)
```

### Parse Bearer token.

This is an example of validation of Bearer tokens.  
BearerValidator is a module dedicated to the Express framework.  

In case of verification error, the following response is automatically returned.  

|HTTP status|WWW-Authenticate response header|Descritpion|
|-|-|-|
|401 Unauthorized|Bearer realm="token_required"|If there is no Authorization header for the request.|
|401 Unauthorized|Bearer realm="\<Your realm name\>",error="invalid_token",error_description="Token format error"|If the Bearer token is empty or incorrect as token68 format.|
|401 Unauthorized|Bearer realm="\<Your realm name\>", error="invalid_token", error_description="Token cannot be authenticated"|If the token is unregistered or invalid and cannot be authenticated.<br>This is the case when the return value of the optional tokenCheckCallback method is FALASE.|
|400 Bad Request|Bearer realm="\<Your realm name\>", error="invalid_request"|In case of request body validation error.<br>This is the case when the return value of the optional requestParameterCheck method is FALASE.|

```js
import express from 'express';
import { body, validationResult } from 'express-validator';
import { BearerParser, BearerValidator } from 'bearer-token-parser';

const router = express.Router();
router.post('/', [
  // Validate input data.
  body('email').isEmail(),
  body('name').isLength({ min: 1, max: 20 }),

  // Validate Bearer tokens.
  BearerValidator.validation({
    realm: 'Sample API',
    tokenCheckCallback: async (token) => {
      // Returns TRUE if the token is correct.
      return token === '<Your Bearer token>';
    },
    requestParameterCheck: (req) => {
      // Returns TRUE if the input data is correct using the "express-validator" package..
      const errors = validationResult(req);
      return errors.isEmpty();
    }
  }),
], async (req, res, next) => {
  // Get bearer token.
  // It gets a token68 format token from the authorization header of the request.
  const token = BearerParser.parseBearerToken(req.headers);
  console.log(`Token: ${token}`);

  // Processing something.
  // ...

  // Respond.
  res.json(true);
});

// mount the router on the app
app.use('/', router)
```

## License

[MIT licensed](./LICENSE.txt)