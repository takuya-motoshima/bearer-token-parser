import express from "express";

/**
 * Bearer token parser.
 */
export default class BearerParser {
  /**
   * A regular expression to find the bearer token in the `Authorization` request header.
   * @type {RegExp}
   */
  private static REGEX_BEARER_TOKEN = /^Bearer\s+([A-Za-z0-9\-\._~\+\/]+)=*$/;

  /**
   * Alias for `BearerParser.parseBearerTokenHeader`.
   * @param {express.Request|{headers: {authorization: string}}} req Request object. Object with `express.Request` or `headers.authorization` item.
   * @return {string|undefined} `Authorization` request header bearer token.
   */
  public static parseBearerToken(req: express.Request|{headers: {authorization? : string}}): string|undefined {
    return this.parseBearerTokenHeader(req);
  }

  /**
   * Get the bearer token from the `Authorization` request header.
   * If unable to retrieve, return undefined.
   * @param {express.Request|{headers: {authorization: string}}} req Request object. Object with `express.Request` or `headers.authorization` item.
   * @return {string|undefined} `Authorization` request header bearer token.
   */
  public static parseBearerTokenHeader(req: express.Request|{headers: {authorization? : string}}): string|undefined {
    if (!req.headers || !req.headers.authorization)
      // If there is no `Authorization` header.
      return undefined;

    // Find the bearer token in the `Authorization` header.
    const matches = req.headers.authorization.match(BearerParser.REGEX_BEARER_TOKEN);

    // Return the bearer tokens found.
    return matches ? matches[1] : undefined;
  }

  /**
   * Get a bearer token from the `query` parameter.
   * If unable to retrieve, return undefined.
   * @param {express.Request|{query: {[key: string]: any}}} req Request object with `express.Request` or `query` object item.
   * @param {string} tokenParameter The parameter name of the token in the query. Default is `access_token`.
   * @return {string|undefined} Query parameter bearer token.
   */
  public static parseBearerTokenQuery(
    req: express.Request|{query: {[key: string]: any}},
    tokenParameter: string = 'access_token'
  ): string|undefined {
    if (!req.query || !req.query[tokenParameter])
      // The request object has no query or no token parameter.
      return undefined;

    // Returns the found token.
    return req.query[tokenParameter];
  }

  /**
   * Get a bearer token from the `body` parameter.
   * If unable to retrieve, return undefined.
   * @param {express.Request|{body: {[key: string]: any}}} req Request object with `express.Request` or `body` object item.
   * @param {string} tokenParameter Parameter name of the token in the body. Default is `access_token`.
   * @return {string|undefined} Body parameter bearer token.
   */
  public static parseBearerTokenBody(
    req: express.Request|{body: {[key: string]: any}},
    tokenParameter: string = 'access_token'
  ): string|undefined {
    if (!req.body || !req.body[tokenParameter])
      // The request object has no body or no token parameter.
      return undefined;

    // Returns the found token.
    return req.body[tokenParameter];
  }
}