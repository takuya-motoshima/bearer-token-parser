# bearer-token-parser

This is a Bearer token authentication module that you can use with the Express framework.

## Installation

```sh
npm install bearer-token-parser;
```

## API
See [API.md](./API.md) for API reference.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).

## Example

There is a sample app in "./example" to try token authentication.

Move to the example directory.
```sh
cd example;
```

Install dependent libraries.
```sh
npm install;
```

Start the app.
```sh
npm start;
```

You can send an authentication request with curl.
```sh
# Token is correct.
# Output: HTTP/1.1 200 OK
#         X-Powered-By: Express
#         Content-Type: text/html; charset=utf-8
#         Content-Length: 29
#         ETag: W/"1d-KmUch1QspvK6Xrde08cn3CIfaHk"
#         Date: Thu, 11 Nov 2021 09:01:11 GMT
#         Connection: keep-alive
#         Keep-Alive: timeout=5
curl -I -H 'Authorization: Bearer eTRPXY8F~np0zbAzi2~KN' http://localhost:3000/auth;

# Wrong token.
# Output: HTTP/1.1 401 Unauthorized
#         X-Powered-By: Express
#         WWW-Authenticate: Bearer realm="Sample API", error="invalid_token", error_description="Token cannot be authenticated"
#         Content-Type: text/plain; charset=utf-8
#         Content-Length: 12
#         ETag: W/"c-dAuDFQrdjS3hezqxDTNgW7AOlYk"
#         Date: Thu, 11 Nov 2021 08:57:38 GMT
#         Connection: keep-alive
#         Keep-Alive: timeout=5
curl -I -H 'Authorization: Bearer SSfLqq7dItHdqPyX+A9KCTxQu9p1bcVq4TCDz~m~' http://localhost:3000/auth;

# Missing Authorization header.
# Output: HTTP/1.1 401 Unauthorized
#         X-Powered-By: Express
#         WWW-Authenticate: Bearer realm="Sample API", error="token_required"
#         Content-Type: text/plain; charset=utf-8
#         Content-Length: 12
#         ETag: W/"c-dAuDFQrdjS3hezqxDTNgW7AOlYk"
#         Date: Thu, 11 Nov 2021 08:58:58 GMT
#         Connection: keep-alive
#         Keep-Alive: timeout=5
curl -I http://localhost:3000/auth;

# Authorization header but no Token.
# Output: HTTP/1.1 401 Unauthorized
#         X-Powered-By: Express
#         WWW-Authenticate: Bearer realm="Sample API", error="invalid_token", error_description="Token format error"
#         Content-Type: text/plain; charset=utf-8
#         Content-Length: 12
#         ETag: W/"c-dAuDFQrdjS3hezqxDTNgW7AOlYk"
#         Date: Thu, 11 Nov 2021 09:00:09 GMT
#         Connection: keep-alive
#         Keep-Alive: timeout=5
curl -I -H 'Authorization: Bearer ' http://localhost:3000/auth;
```

## Usage

### Parse Bearer token.

An example of an Express framework. BearerParser can also be used with other frameworks.

```js
import express from 'express';
import {BearerParser} from 'bearer-token-parser';

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
|401 Unauthorized|Bearer realm="\<Your realm name\>", error="token_required"|If there is no Authorization header for the request.|
|401 Unauthorized|Bearer realm="\<Your realm name\>", error="invalid_token", error_description="Token format error"|If the Bearer token is empty or incorrect as token68 format.|
|401 Unauthorized|Bearer realm="\<Your realm name\>", error="invalid_token", error_description="Token cannot be authenticated"|If the token is unregistered or invalid and cannot be authenticated.<br>This is the case when the return value of the optional tokenCheckCallback method is FALASE.|
|400 Bad Request|Bearer realm="\<Your realm name\>", error="invalid_request"|In case of request body validation error.<br>This is the case when the return value of the optional requestParameterCheck method is FALASE.|

```js
import express from 'express';
import {body, validationResult} from 'express-validator';
import {BearerParser, BearerValidator} from 'bearer-token-parser';

const router = express.Router();
router.post('/', [
  // Validate input data.
  body('email').isEmail(),
  body('name').isLength({min: 1, max: 20}),

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

## Author

**Takuya Motoshima**

* [github/takuya-motoshima](https://github.com/takuya-motoshima)
* [twitter/TakuyaMotoshima](https://twitter.com/TakuyaMotoshima)
* [facebook/takuya.motoshima.7](https://www.facebook.com/takuya.motoshima.7)

## License

[MIT licensed](./LICENSE.txt)