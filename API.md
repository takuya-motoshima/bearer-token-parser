# BearerParser class.

This is a module that parses Bearer tokens that can be used in various framework-independent situations.

## Methods

### parseBearerToken()

Returns Bearer token from request header.

###### Syntax
```js
BearerParser.parseBearerToken(headers: { authorization? : string }): string|undefined
```

###### Parameters
- __headers__: { authorization? : string }  
    Request header object.

###### Returns
Returns the Bearer token. If it cannot be obtained, it returns undefined.

# BearerValidator class.

This is middleware for validating Bearer tokens in the Express framework.

## Methods

### validation()

Validate Bearer tokens.  

In case of validation error, the error response related to authentication is returned in the WWW-Authenticate header.  

|HTTP status|WWW-Authenticate response header|Descritpion|
|-|-|-|
|401 Unauthorized|Bearer realm="\<Your realm name\>", error="token_required"|If there is no Authorization header for the request.|
|401 Unauthorized|Bearer realm="\<Your realm name\>", error="invalid_token", error_description="Token format error"|If the Bearer token is empty or incorrect as token68 format.|
|401 Unauthorized|Bearer realm="\<Your realm name\>", error="invalid_token", error_description="Token cannot be authenticated"|If the token is unregistered or invalid and cannot be authenticated.<br>This is the case when the return value of the optional tokenCheckCallback method is FALASE.|
|400 Bad Request|Bearer realm="\<Your realm name\>", error="invalid_request"|In case of request body validation error.<br>This is the case when the return value of the optional requestParameterCheck method is FALASE.|

###### Syntax
```js
BearerValidator.validation(options: {
  realm?: string,
  tokenCheckCallback?: undefined|Function,
  requestParameterCheck?: undefined|Function
}): Function
```

###### Parameters
- __realm__: string  
    Specify the realm name to be included in the response header. The default is empty.

- __tokenCheckCallback__: undefined|Function  
    Specify the function that performs token authentication such as comparison with the token stored in the DB.  
    This function receives the token obtained from the request header as an argument.

- __requestParameterCheck__: undefined|Function  
    Validate the request body parameters.  
    This function takes an Express request object as an argument.

###### Returns
Returns a middleware function that validates Bearer.

