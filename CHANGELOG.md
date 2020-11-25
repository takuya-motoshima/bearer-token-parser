# Changelog

## [1.0.2] - 2020-11-22

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

- Fix screen capture.

## [1.0.0] - 2020-11-22

- First release.
