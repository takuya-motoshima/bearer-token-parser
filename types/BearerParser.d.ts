import express from "express";
/**
 * Bearer token parser.
 */
export default class BearerParser {
    /**
     * A regular expression to find the bearer token in the `Authorization` request header.
     * @type {RegExp}
     */
    private static REGEX_BEARER_TOKEN;
    /**
     * Alias for `BearerParser.parseBearerTokenHeader`.
     * @param {express.Request|{headers: {authorization: string}}} req Request object. Object with `express.Request` or `headers.authorization` item.
     * @return {string|undefined} `Authorization` request header bearer token.
     */
    static parseBearerToken(req: express.Request | {
        headers: {
            authorization?: string;
        };
    }): string | undefined;
    /**
     * Get the bearer token from the `Authorization` request header.
     * If unable to retrieve, return undefined.
     * @param {express.Request|{headers: {authorization: string}}} req Request object. Object with `express.Request` or `headers.authorization` item.
     * @return {string|undefined} `Authorization` request header bearer token.
     */
    static parseBearerTokenHeader(req: express.Request | {
        headers: {
            authorization?: string;
        };
    }): string | undefined;
    /**
     * Get a bearer token from the `query` parameter.
     * If unable to retrieve, return undefined.
     * @param {express.Request|{query: {[key: string]: any}}} req Request object with `express.Request` or `query` object item.
     * @param {string} tokenParameter The parameter name of the token in the query. Default is `access_token`.
     * @return {string|undefined} Query parameter bearer token.
     */
    static parseBearerTokenQuery(req: express.Request | {
        query: {
            [key: string]: any;
        };
    }, tokenParameter?: string): string | undefined;
    /**
     * Get a bearer token from the `body` parameter.
     * If unable to retrieve, return undefined.
     * @param {express.Request|{body: {[key: string]: any}}} req Request object with `express.Request` or `body` object item.
     * @param {string} tokenParameter Parameter name of the token in the body. Default is `access_token`.
     * @return {string|undefined} Body parameter bearer token.
     */
    static parseBearerTokenBody(req: express.Request | {
        body: {
            [key: string]: any;
        };
    }, tokenParameter?: string): string | undefined;
}
