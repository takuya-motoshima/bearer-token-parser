const {BearerParser} = require('../dist/build.common');
const mockReq = require('./support/mockReq');

describe('Get token from Header', () => {
  test('Should get token from Authorization header', () => {
    const req = mockReq({headers: {authorization: 'Bearer mytoken123'}});
    expect(BearerParser.parseBearerTokenHeader(req)).toEqual('mytoken123');
  });

  test('If there is no Authorization header, the result of getting the token should be undefined', () => {
    const req = mockReq();
    expect(BearerParser.parseBearerTokenHeader(req)).toBeUndefined();
  });

  test('If there is an Authorization header but the token is undefined, the result of getting the token should be undefined', () => {
    const req = mockReq({headers: {authorization: 'Bearer '}});
    expect(BearerParser.parseBearerTokenHeader(req)).toBeUndefined();
  });
});

describe('Get token from Query', () => {
  test('Should get the token from the query parameter', () => {
    const req = mockReq({query: {access_token: 'mytoken123'}});
    expect(BearerParser.parseBearerTokenQuery(req, 'access_token')).toEqual('mytoken123');
  });

  test('If there is no token in Query, the result of getting the token should be undefined', () => {
    const req = mockReq({query: {}});
    expect(BearerParser.parseBearerTokenQuery(req, 'access_token')).toBeUndefined();
});
});

describe('Get token from Body', () => {
  test('Should get the token from the body parameter', () => {
    const req = mockReq({body: {access_token: 'mytoken123'}});
    expect(BearerParser.parseBearerTokenBody(req, 'access_token')).toEqual('mytoken123');
  });

  test('If there is no token in Body, the result of getting the token should be undefined', () => {
    const req = mockReq({body: {}});
    expect(BearerParser.parseBearerTokenBody(req, 'access_token')).toBeUndefined();
  });
});