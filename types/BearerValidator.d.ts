/**
 * This is middleware that validates Bearer token authentication with the Express framework.
 *
 * @example
 * import express from 'express';
 * import {body, validationResult} from 'express-validator';
 * import {BearerParser, BearerTokenValidator} from 'bearer-token-parser';
 *
 * const router = express.Router();
 * router.post('/', [
 *   // Validate input data.
 *   body('email').isEmail(),
 *   body('name').isLength({min: 1, max: 20}),
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
     * @param  {Object} opts
     * @return {Function}
     */
    static validation(opts: {
        realm?: string;
        tokenCheckCallback?: undefined | Function;
        requestParameterCheck?: undefined | Function;
    }): Function;
    /**
     * Returns whether it is an Async function
     *
     * @param  {Function} value
     * @return {boolean}
     */
    private static isAsyncFunction;
}
