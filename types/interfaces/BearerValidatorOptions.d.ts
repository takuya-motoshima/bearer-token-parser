import { Request } from "express";
/**
 * Bearer token validation option.
 */
export default interface BearerValidatorOptions {
    /**
     * Select the Token location as header/body/query.
     * If `header`, get token from `Authorization` request header.
     * If `query`, get the token from the `query` parameter.
     * If `body`, get the token from the `body` parameter.
     * The default is `header`.
     */
    tokenLocation?: 'header' | 'query' | 'body';
    /**
     * If `tokenLocation` is `query` or `body`, you must specify the parameter name of the token.
     * Default is `access_token`.
     */
    tokenParameter?: string;
    /**
     * Specify the realm name to be included in the response header. The default is empty.
     */
    realm?: string;
    /**
     * Specify the function that performs token authentication such as comparison with the token stored in the DB.
     * This function receives the token obtained from the request header as an argument.
     */
    tokenCheckCallback?: (token: string) => (Promise<boolean> | boolean) | undefined;
    /**
     * Validate the request `body` parameters.
     * This function takes an Express request object as an argument.
     */
    requestParameterCheck?: (req: Request) => (Promise<boolean> | boolean) | undefined;
}
