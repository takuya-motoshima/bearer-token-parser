# BearerParser class.
This is a module that parses Bearer tokens that can be used in various framework-independent situations.

## Static Methods
- ### parseBearerToken()  
    Alias for `BearerParser.parseBearerTokenHeader`.
- ### parseBearerTokenHeader()  
    Get the bearer token from the `Authorization` request header.  
    If unable to retrieve, return undefined.

    #### Syntax:
    ```js
    BearerParser.parseBearerTokenHeader(req: express.Request|{headers: {authorization? : string}}): string|undefined
    ```

    #### Parameters:
    - `req`: express.Request|{headers: {authorization: string}}  
        Request object. Object with `express.Request` or `headers.authorization` item.

    #### Return:
    `Authorization` request header bearer token.


    #### Examples
    ```js
    import {BearerParser} from 'bearer-token-parser';

    const req = {headers: {authorization: 'Bearer mytoken123'}};
    const token = BearerParser.parseBearerTokenHeader(req);
    ```

- ### parseBearerTokenQuery()  
    Get a bearer token from the `query` parameter.  
    If unable to retrieve, return undefined.  

    #### Syntax:
    ```js
    BearerParser.parseBearerTokenQuery(
        req: express.Request|{query: {[key: string]: any}},
        tokenParameter: string = 'access_token'
    ): string|undefined
    ```

    #### Parameters:
    - `req`: express.Request|{query: {[key: string]: any}}  
        Request object with `express.Request` or `query` object item.
    - `tokenParameter`: string  
        The parameter name of the token in the query. Default is `access_token`.

    #### Return:
    Query parameter bearer token.

    #### Examples
    ```js
    import {BearerParser} from 'bearer-token-parser';

    const req = {query: {'access_token': 'mytoken123'}};
    const token = BearerParser.parseBearerTokenQuery(req, 'access_token');
    ```
- ### parseBearerTokenBody()  
    Get a bearer token from the `body` parameter.  
    If unable to retrieve, return undefined.

    #### Syntax:
    ```js
    BearerParser.parseBearerTokenBody(
        req: express.Request|{body: {[key: string]: any}},
        tokenParameter: string = 'access_token'
    ): string|undefined
    ```

    #### Parameters:
    - `req`: express.Request|{body: {[key: string]: any}}  
        Request object with `express.Request` or `body` object item.
    - `tokenParameter`: string  
        Parameter name of the token in the body. Default is `access_token`.

    #### Return:
    Body parameter bearer token.

    #### Examples
    ```js
    import {BearerParser} from 'bearer-token-parser';

    const req = {body: {'access_token': 'mytoken123'}};
    const token = BearerParser.parseBearerTokenBody(req, 'access_token');
    ```

# BearerValidator class.
Express framework middleware for Bearer token authentication.

## Static Methods
- ### validation()  
    Token authentication middleware initialization.  
    In case of validation error, the error response related to authentication is returned in the WWW-Authenticate header.  

    |HTTP status|WWW-Authenticate response header|Descritpion|
    |-|-|-|
    |401 Unauthorized|Bearer realm="Your realm name", error="token_required"|If the token locale is `Header` and there is no `Authorization` header.<br>or if the token localization is `Body`/`Query` and there is no token parameter.|
    |401 Unauthorized|Bearer realm="Your realm name", error="invalid_token", error_description="Token format error"|If the Bearer token is empty or incorrect as `token68` format.|
    |401 Unauthorized|Bearer realm="Your realm name", error="invalid_token", error_description="Token cannot be authenticated"|If the token is unregistered or invalid and cannot be authenticated.<br>This is the case when the return value of the optional tokenCheckCallback method is FALASE.|
    |400 Bad Request|Bearer realm="Your realm name", error="invalid_request"|In case of request body validation error.<br>This is the case when the return value of the optional requestParameterCheck method is FALASE.|

    #### Syntax:
    ```js
    BearerValidator.validation(
        options: {
            tokenLocation?: 'header'|'query'|'body',
            tokenParameter?: string,
            realm?: string,
            tokenCheckCallback?: (token: string) => (Promise<boolean>|boolean)|undefined,
            requestParameterCheck?: (req: express.Request) => (Promise<boolean>|boolean)|undefined
        }): (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>
    ```

    #### Parameters:
    - `options.tokenLocation`: &#039;header&#039;|&#039;query&#039;|&#039;body&#039;  
        Select the Token location as header/body/query.  
        If `header`, get token from `Authorization` request header.  
        If `query`, get the token from the `query` parameter.  
        If `body`, get the token from the `body` parameter.  
        The default is `header`.
    - `options.tokenParameter`: string  
        If `tokenLocation` is `query` or `body`, you must specify the parameter name of the token.  
        Default is `access_token`.
    - `options.realm`: string  
        Specify the realm name to be included in the response header. The default is empty.
    - `options.tokenCheckCallback`: (token: string) =&gt; (Promise&lt;boolean&gt;|boolean)|undefined  
        Specify the function that performs token authentication such as comparison with the token stored in the DB.  
        This function receives the token obtained from the request header as an argument.
    - `options.requestParameterCheck`: (req: express.Request) =&gt; (Promise&lt;boolean&gt;|boolean)|undefined  
        Validate the request `body` parameters.  
        This function takes an Express request object as an argument.

    #### Return:
    Token authentication middleware.

    #### Exceptions:
    - TypeError  
        If the token location is `query` or `body` and no token parameter is specified.  
        Invalid value other than `header`, `query`, or `body` specified for token location.
- ### resWithWwwAuthenticate()  
    HTTP response with `WWW-Authenticate` header.

    #### Syntax:
    ```js
    BearerValidator.resWithWwwAuthenticate(
        res: express.Response,
        status: number,
        realm: string,
        error?: string,
        errorDescription?: string
    )
    ```

    #### Parameters:
    - `res`: express.Response  
        Response object.
    - `status`: number  
        HTTP Status Code.
    - `realm`: string  
        Realm name to be included in response headers.
    - `error`?: string  
        Error Name. Set to `error` in the `WWW-Authenticate` header. The default is none (`undefined`).
    - `errorDescription`?: string  
        Error Description. Set to `error_description` in the `WWW-Authenticate` header. The default is none (`undefined`).

    #### Examples
    ```js
    import express from 'express';
    import {BearerParser, BearerValidator} from 'bearer-token-parser';

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
        // For example, it performs its own checks and responds with an authentication error if invalid.
        this.resWithWwwAuthenticate(res, 401, 'myapi', 'custom_error');
    });
    ```

