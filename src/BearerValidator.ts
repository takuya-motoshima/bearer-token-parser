import BearerParser from '~/BearerParser';
import { Request, Response, NextFunction } from "express";

/**
 * This is middleware that validates Bearer token authentication with the Express framework.
 *
 * @example
 * import express from 'express';
 * import { body, validationResult } from 'express-validator';
 * import { BearerParser, BearerTokenValidator } from 'bearer-token-parser';
 * 
 * const router = express.Router();
 * router.post('/', [
 *   // Validate input data.
 *   body('email').isEmail(),
 *   body('name').isLength({ min: 1, max: 20 }),
 * 
 *   // Validate Bearer tokens.
 *   BearerTokenValidator.validation({
 *     realm: 'Sample API',
 *     tokenCheckCallback: async (token) => {
 *       // Returns TRUE if the token is correct.
 *       return token === '<Your Bearer token>';
 *     },
 *     requestParameterCheck: (req) => {
 *       // Returns TRUE if the input data is correct using the "express-validator" package..
 *       const errors = validationResult(req);
 *       return errors.isEmpty();
 *     }
 *   }),
 * ], async (req, res, next) => {
 * 
 *   // Get bearer token.
 *   const token = BearerParser.parseBearerToken(req.headers);
 *   console.log(`Token: ${token}`);
 * 
 *   // Processing something.
 *   // ...
 * 
 *   // Respond.
 *   res.json(true);
 * });
 * 
 * // mount the router on the app
 * app.use('/', router)
 */
export default class {

  /**
   * Returns a middleware function that checks the bearer token.
   * 
   * @param  {Object} options
   * @return {Function}
   */
  public static validation(options: {
    realm?: string,
    tokenCheckCallback?: undefined|Function,
    requestParameterCheck?: undefined|Function
  }): Function {

    // Initialize options.
    options = Object.assign({
      realm: '',
      tokenCheckCallback: undefined,
      requestParameterCheck: undefined
    }, options||{});

    // Returns a middleware function that checks the bearer token.
    return async (req: Request, res: Response, next: NextFunction) => {
      // Returns a 401 error if the request does not include an Authorization header.
      if (!req.headers.authorization)
          return void res
            .header('WWW-Authenticate', 'Bearer realm="token_required"')
            .sendStatus(401);

      // Get bearer token.
      const token = BearerParser.parseBearerToken(req.headers);

      // Returns a 401 error if the token in the Authorization header is empty or malformatted.
      if (!token)
          return void res
            .header('WWW-Authenticate', `Bearer realm="${options.realm}", error="invalid_token", error_description="Token format error"`)
            .sendStatus(401);

      // Check if the token is correct.
      if (options.tokenCheckCallback) {
        const isValid = this.isAsyncFunction(options.tokenCheckCallback)
          ? await options.tokenCheckCallback(token)
          : options.tokenCheckCallback(token);
        if (!isValid)
            return void res
              .header('WWW-Authenticate', `Bearer realm="${options.realm}", error="invalid_token", error_description="Token cannot be authenticated"`)
              .sendStatus(401);
      }

      // Check request data.
      if (options.requestParameterCheck) {
        const isValid = this.isAsyncFunction(options.requestParameterCheck)
          ? await options.requestParameterCheck(req)
          : options.requestParameterCheck(req);
        if (!isValid)
          return void res
            .header('WWW-Authenticate', `Bearer realm="${options.realm}", error="invalid_request"`)
            .sendStatus(400);
      }

      // If you can get a bearer token, proceed to the next middleware.
      next();
    };
  }

  /**
   * Returns whether it is an Async function
   * 
   * @param  {Function} value
   * @return {boolean}
   */
  private static isAsyncFunction(value: Function): boolean {
    return value && value.constructor && value.constructor === Object.getPrototypeOf(async function(){}).constructor
  }
}