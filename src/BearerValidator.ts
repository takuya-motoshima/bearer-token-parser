import express from "express";
import BearerParser from '~/BearerParser';
import BearerValidatorOptions from '~/interfaces/BearerValidatorOptions';
import isAsyncFunction from '~/utils/isAsyncFunction';

/**
 * Express framework middleware for Bearer token authentication.
 */
export default class {
  /**
   * Token authentication middleware initialization.
   * @param {BearerValidatorOptions} options Bearer token validation option.
   * @return {(req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>} Token authentication middleware.
   * @throws {@link TypeError} If the token location is `query` or `body` and no token parameter is specified.
   * @throws {@link TypeError} Invalid value other than `header`, `query`, or `body` specified for token location.
   */
  public static validation(options: BearerValidatorOptions): (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void> {
    // Initialize options.
    options = Object.assign({
      tokenLocation: 'header',
      tokenParameter: 'access_token',
      realm: '',
      tokenCheckCallback: undefined,
      requestParameterCheck: undefined
    }, options || {});

    // Required check for token parameter name.
    if ((options.tokenLocation === 'query' || options.tokenLocation === 'body') && !options.tokenParameter)
      throw new TypeError('If the token location is `query` or body`, the token parameter name is required');

    // Returns middleware that validates bearer tokens.
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      // If the token location is `Header`, return a `401` error if the `Authorization` header is not present.
      // If the token location is `Body`/`Query`, return a `401 error if the token parameter is not present.
      if (
        (options.tokenLocation === 'header' && (!req.headers || !req.headers.authorization))
        || (options.tokenLocation === 'query' && (!req.query || !req.query.hasOwnProperty(options.tokenParameter!)))
        || (options.tokenLocation === 'body' && (!req.body || !req.body.hasOwnProperty(options.tokenParameter!)))
      )
        return void this.resWithWwwAuthenticate(res, 401, options.realm!, 'token_required');

      // Get Token.
      let token;
      switch (options.tokenLocation) {
      case 'header':
        token = BearerParser.parseBearerTokenHeader(req);
        break;
      case 'query':
        token = BearerParser.parseBearerTokenQuery(req, options.tokenParameter);
        break;
      case 'body':
        token = BearerParser.parseBearerTokenBody(req, options.tokenParameter);
        break;
      default:
        throw new TypeError('token location is invalid value, can be any of `header`, `query`, or `body`');
      }

      if (!token)
        // If the token is empty or the format is invalid, a `401` error is returned.
        return void this.resWithWwwAuthenticate(res, 401, options.realm!, 'invalid_token', 'Token format error');
      if (options.tokenCheckCallback) {
        // Execute token validation callback function.
        const valid = isAsyncFunction(options.tokenCheckCallback) ? await options.tokenCheckCallback(token) : options.tokenCheckCallback(token);
        if (!valid)
          return void this.resWithWwwAuthenticate(res, 401, options.realm!, 'invalid_token', 'Token cannot be authenticated');
      }
      if (options.requestParameterCheck) {
        // Execute request data validation callback function.
        const valid = isAsyncFunction(options.requestParameterCheck) ? await options.requestParameterCheck(req) : options.requestParameterCheck(req);
        if (!valid)
          return void this.resWithWwwAuthenticate(res, 400, options.realm!, 'invalid_request');
      }

      // If the authentication is successful, control is passed to the next process.
      next();
    };
  }

  /**
   * HTTP response with `WWW-Authenticate` header.
   * @param {express.Response} res Response object.
   * @param {number} status HTTP Status Code.
   * @param {string} realm Realm name to be included in response headers.
   * @param {string|undefined} error? Error Name. Set to `error` in the `WWW-Authenticate` header. The default is none (`undefined`).
   * @param {string|undefined} errorDescription? Error Description. Set to `error_description` in the `WWW-Authenticate` header. The default is none (`undefined`).
   */
  public static resWithWwwAuthenticate(
    res: express.Response,
    status: number,
    realm: string,
    error?: string,
    errorDescription?: string
  ) {
    let wwwAuthenticate = `Bearer realm="${realm}"`;
    if (error)
      wwwAuthenticate += `, error="${error}"`;
    if (errorDescription)
      wwwAuthenticate += `, error_description="${errorDescription}"`;
    res
      .header('WWW-Authenticate', wwwAuthenticate)
      .sendStatus(status);
  }
}