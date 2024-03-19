import express from "express";
import BearerValidatorOptions from '~/interfaces/BearerValidatorOptions';
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
    static validation(options: BearerValidatorOptions): (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>;
    /**
     * HTTP response with `WWW-Authenticate` header.
     * @param {express.Response} res Response object.
     * @param {number} status HTTP Status Code.
     * @param {string} realm Realm name to be included in response headers.
     * @param {string|undefined} error? Error Name. Set to `error` in the `WWW-Authenticate` header. The default is none (`undefined`).
     * @param {string|undefined} errorDescription? Error Description. Set to `error_description` in the `WWW-Authenticate` header. The default is none (`undefined`).
     */
    static resWithWwwAuthenticate(res: express.Response, status: number, realm: string, error?: string, errorDescription?: string): void;
}
