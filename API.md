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

