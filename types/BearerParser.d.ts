/**
 * Bearer token parser.
 */
export default class BearerParser {
    private static REGEX_BEARER_TOKEN;
    /**
     * Returns Bearer token from request header.
     *
     * @param {Object} headers Request headers.
     * @return {string|undefined}
     */
    static parseBearerToken(headers: {
        authorization?: string;
    }): string | undefined;
}
