# Changelog

All notable changes to this project will be documented in this file.

## [1.0.3] - 2021-11-11
### Fixed
- Refactor your code. Fixed example app.

## [1.0.2] - 2020-11-22
### Fixed
- Changed error response when request does not have Authorization header.

    After the change.  
    ```sh
    www-authenticate: Bearer realm="<Your realm name>", error="token_required"
    ```

    Before the change.  
    ```sh
    www-authenticate: Bearer realm="token_required"
    ```

## [1.0.1] - 2020-11-22
### Fixed
- Fix screen capture.

## [1.0.0] - 2020-11-22
### Fixed
- First release.

[1.0.1]: https://github.com/takuya-motoshima/bearer-token-parser/compare/v1.0.0...v1.0.1
[1.0.2]: https://github.com/takuya-motoshima/bearer-token-parser/compare/v1.0.1...v1.0.2
[1.0.3]: https://github.com/takuya-motoshima/bearer-token-parser/compare/v1.0.2...v1.0.3
