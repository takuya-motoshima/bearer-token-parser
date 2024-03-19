# bearer-token-parser
This is a Bearer token authentication module that you can use with the Express framework.

## Installation
```sh
npm i bearer-token-parser
```

## API
See [API.md](API.md) for API reference.

## Release Notes
All changes can be found [here](CHANGELOG.md).

## Quick Start
There is a sample app in "./example" to try token authentication.

1. Move to the example directory.
    ```sh
    cd example/
    ```
1. Install dependencies.
    ```sh
    npm install
    ```
1. Start the app.
    ```sh
    npm start
    ```
1. You can send an authentication request with curl.
    - Correct token  
        ```sh
        # HTTP Status: 200 OK
        curl -I -H 'Authorization: Bearer mytoken123' http://localhost:3000/auth
        ```
    - Wrong token  
        ```sh
        # HTTP Status: 401 Unauthorized  
        # WWW-Authenticate: Bearer realm="myapi", error="invalid_token", error_description="Token cannot be authenticated"
        curl -I -H 'Authorization: Bearer mytoken456' http://localhost:3000/auth
        ```
    - Missing Authorization header  
        ```sh
        # HTTP Status: 401 Unauthorized  
        # WWW-Authenticate: Bearer realm="myapi", error="token_required"
        curl -I http://localhost:3000/auth
        ```
    - Authorization header but no Token  
        ```sh
        # HTTP Status: 401 Unauthorized  
        # WWW-Authenticate: Bearer realm="myapi", error="invalid_token", error_description="Token format error"
        curl -I -H 'Authorization: Bearer ' http://localhost:3000/auth
        ```

## Usage
- An example of an Express framework.  
    BearerParser can also be used with other frameworks.
    ```js
    import express from 'express';
    import {BearerParser} from 'bearer-token-parser';

    const router = express.Router();
    router.post('/', async (req, res) => {
        // Get bearer token.
        const token = BearerParser.parseBearerTokenHeader(req);

        // Execute any process and response.
        res.json(true);
    });

    // mount the router on the app.
    app.use('/', router)
    ```
- This is an example of validation of Bearer tokens.  
    `BearerValidator` is a module dedicated to the Express framework.  
    In case of verification error, the following response is automatically returned.  

    |HTTP status|WWW-Authenticate response header|Descritpion|
    |-|-|-|
    |401 Unauthorized|Bearer realm="Your realm name", error="token_required"|If the token locale is `Header` and there is no `Authorization` header.<br>or if the token localization is `Body`/`Query` and there is no token parameter.|
    |401 Unauthorized|Bearer realm="Your realm name", error="invalid_token", error_description="Token format error"|If the Bearer token is empty or incorrect as `token68` format.|
    |401 Unauthorized|Bearer realm="Your realm name", error="invalid_token", error_description="Token cannot be authenticated"|If the token is unregistered or invalid and cannot be authenticated.<br>This is the case when the return value of the optional tokenCheckCallback method is FALASE.|
    |400 Bad Request|Bearer realm="Your realm name", error="invalid_request"|In case of request body validation error.<br>This is the case when the return value of the optional requestParameterCheck method is FALASE.|

    ```js
    import express from 'express';
    import {BearerParser, BearerValidator} from 'bearer-token-parser';
    import {body, validationResult} from 'express-validator';

    const router = express.Router();
    router.post('/', [
        // Validation of input data by express-validator.
        body('email').isEmail(),
        body('name').isLength({min: 1, max: 20}),

        // Token authentication middleware initialization.
        BearerValidator.validation({
            // // Select the Token location as header/body/query.
            // tokenLocation: 'query',

            // // If the token location is query or body, specify the parameter name of the token.
            // tokenParameter: 'access_token',

            // Realm name to be included in response headers.
            realm: 'myapi',
            tokenCheckCallback: async (token) => {
                // Return `TRUE` if the token is correct.
                // If you return `FALSE`, a `401` error will be returned by the `BearerValidator.validation` middleware.
                return token === '<Your Bearer token>';
            },
            requestParameterCheck: (req) => {
                // Return `TRUE` if the input data is correct using `express-validator`.
                // If `FALSE` is returned, a `400` error is returned by the `BearerValidator.validation` middleware.
                const errors = validationResult(req);
                return errors.isEmpty();
            }
        }),
    ], async (req, res) => {
        // Get bearer token.
        const token = BearerParser.parseBearerTokenHeader(req);

        // Execute any process and response.
        res.json(true);
    });

    // mount the router on the app.
    app.use('/', router)
    ```

## Testing
With [npm](http://npmjs.org) do:

```sh
npm test
```

## Author
**Takuya Motoshima**

* [github/takuya-motoshima](https://github.com/takuya-motoshima)
* [twitter/TakuyaMotoshima](https://twitter.com/TakuyaMotoshima)
* [facebook/takuya.motoshima.7](https://www.facebook.com/takuya.motoshima.7)

## License
[MIT](LICENSE)