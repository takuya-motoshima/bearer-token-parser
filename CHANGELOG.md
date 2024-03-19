# Changelog
All notable changes to this project will be documented in this file.

## [2.0.0] - 2024/3/19
### Added
- The token parser class (`BearerParser` class) now supports methods to retrieve tokens from Query or Body.
    See the [API reference](API.md) for more details.

    |Method|Description|
    |--|--|
    |`BearerParser.parseBearerToken()`|Alias for `BearerParser.parseBearerTokenHeader`.|
    |`BearerParser.parseBearerTokenHeader()`|New. Get the bearer token from the `Authorization` request header.|
    |`BearerParser.parseBearerTokenQuery()`|New. Get a bearer token from the `query` parameter.|
    |`BearerParser.parseBearerTokenBody()`|New. Get a bearer token from the `body` parameter.|
- Token authentication middleware (`BearerValidator` class) now supports `Query` or `Body` token validation.  
    To validate a `Query` or `Body` token, specify `query` or `body` in the `tokenLocation` option and the parameter name of the token in the `tokenParameter` option.  
    See the [API reference](API.md) for more details.

    ```js
    // Token authentication middleware initialization.
    BearerValidator.validation({
        // Select the Token location as header/body/query.
        tokenLocation: 'query',

        // If the token location is query or body, specify the parameter name of the token.
        tokenParameter: 'access_token',

        // Realm name to be included in response headers.
        realm: 'myapi',
        tokenCheckCallback: async (token) => {
            // Return `TRUE` if the token is correct.
            // If you return `FALSE`, a `401` error will be returned by the `BearerValidator.validation` middleware.
            return token === '<Your Bearer token>';
        },
    }),
    ```

### Changed
- TypeScript was updated from version 3 to 5.
- The parameter type of `BearerParser.parseBearerToken()` has changed.  
    The parameter type used to be `{authorization: string}`, but now it is `{headers: {authorization: string}}`.

## [1.0.3] - 2021/11/11
### Fixed
- Refactor your code. Fixed example app.

## [1.0.2] - 2020/11/22
### Fixed
- Changed error response when request does not have `Authorization` header.  
    After:  
    ```sh
    www-authenticate: Bearer realm="myapi", error="token_required"
    ```

    Before:  
    ```sh
    www-authenticate: Bearer realm="token_required"
    ```

## [1.0.1] - 2020/11/22
### Fixed
- Fix screen capture.

## [1.0.0] - 2020/11/22
### Fixed
- First release.

[1.0.1]: https://github.com/takuya-motoshima/bearer-token-parser/compare/v1.0.0...v1.0.1
[1.0.2]: https://github.com/takuya-motoshima/bearer-token-parser/compare/v1.0.1...v1.0.2
[1.0.3]: https://github.com/takuya-motoshima/bearer-token-parser/compare/v1.0.2...v1.0.3
[2.0.0]: https://github.com/takuya-motoshima/bearer-token-parser/compare/v1.0.3...v2.0.0