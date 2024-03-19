const sinon = require('sinon');
const {BearerValidator} = require('../dist/build.common');
const mockReq = require('./support/mockReq');
const mockRes = require('./support/mockRes');

/**
 * Token authentication middleware initialization.
 * @param {BearerValidatorOptions} options Bearer token validation option.
 * @return {(req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>} Token authentication middleware.
 */
const initBearerValidator = (options = undefined) => {
  return BearerValidator.validation(Object.assign({
    realm: 'myapi',
    tokenCheckCallback: token => token === 'mytoken123',
  }, options));
}

describe('Authenticate Header token', () => {
  test('If the token in the Authorization header is correct, next() should be called', () => {
    // Token authentication middleware initialization.
    const middleware = initBearerValidator();

    // Run middleware.
    const req = mockReq({headers: {authorization: `Bearer mytoken123`}});
    const res = mockRes();
    const next = sinon.spy();// Monitor calls to next().
    middleware(req, res, next);

    // The token is correct and next() should be called.
    expect(next.calledOnce).toEqual(true);
  });

  test('Without Authorization header, should be 401 response', () => {
    // Token authentication middleware initialization.
    const middleware = initBearerValidator();

    // Run middleware.
    const req = mockReq();
    const res = mockRes();
    const next = sinon.spy();// Monitor calls to next().
    middleware(req, res, next);

    // Check that it is the expected response.
    expect(res.sendStatus.getCall(0).args[0]).toEqual(401);
    expect(res.header.getCall(0).args[0]).toEqual('WWW-Authenticate');
    expect(res.header.getCall(0).args[1]).toEqual(`Bearer realm="myapi", error="token_required"`);
  });

  test('If Authorization header is present but token is undefined, should be 401 response', () => {
    // Token authentication middleware initialization.
    const middleware = initBearerValidator();

    // Run middleware.
    const req = mockReq({headers: {authorization: 'Bearer '}});
    const res = mockRes();
    const next = sinon.spy();// Monitor calls to next().
    middleware(req, res, next);

    // Check that it is the expected response.
    expect(res.sendStatus.getCall(0).args[0]).toEqual(401);
    expect(res.header.getCall(0).args[0]).toEqual('WWW-Authenticate');
    expect(res.header.getCall(0).args[1]).toEqual(`Bearer realm="myapi", error="invalid_token", error_description="Token format error"`);
  });

  test('If the Authorization header token does not match, the response should be a 401 response', () => {
    // Token authentication middleware initialization.
    const middleware = initBearerValidator();

    // Run middleware.
    const req = mockReq({headers: {authorization: 'Bearer mytoken456'}});
    const res = mockRes();
    const next = sinon.spy();// Monitor calls to next().
    middleware(req, res, next);

    // Check that it is the expected response.
    expect(res.sendStatus.getCall(0).args[0]).toEqual(401);
    expect(res.header.getCall(0).args[0]).toEqual('WWW-Authenticate');
    expect(res.header.getCall(0).args[1]).toEqual(`Bearer realm="myapi", error="invalid_token", error_description="Token cannot be authenticated"`);
  });
});

describe('Authenticate Query token', () => {
  test('If the token in the Query is correct, next() should be called', () => {
    // Token authentication middleware initialization.
    const middleware = initBearerValidator({tokenLocation: 'query', tokenParameter: 'access_token'});

    // Run middleware.
    const req = mockReq({query: {access_token: 'mytoken123'}});
    const res = mockRes();
    const next = sinon.spy();// Monitor calls to next().
    middleware(req, res, next);

    // The token is correct and next() should be called.
    expect(next.calledOnce).toEqual(true);
  });

  test('If there is no token parameter in Query, it should be a 401 response', () => {
    // Token authentication middleware initialization.
    const middleware = initBearerValidator({tokenLocation: 'query', tokenParameter: 'access_token'});

    // Run middleware.
    const req = mockReq({query: {}});
    const res = mockRes();
    const next = sinon.spy();// Monitor calls to next().
    middleware(req, res, next);

    // Check that it is the expected response.
    expect(res.sendStatus.getCall(0).args[0]).toEqual(401);
    expect(res.header.getCall(0).args[0]).toEqual('WWW-Authenticate');
    expect(res.header.getCall(0).args[1]).toEqual(`Bearer realm="myapi", error="token_required"`);
  });

  test('If the Query tokens do not match, the response should be a 401 response', () => {
    // Token authentication middleware initialization.
    const middleware = initBearerValidator({tokenLocation: 'query', tokenParameter: 'access_token'});

    // Run middleware.
    const req = mockReq({query: {access_token: 'mytoken456'}});
    const res = mockRes();
    const next = sinon.spy();// Monitor calls to next().
    middleware(req, res, next);

    // Check that it is the expected response.
    expect(res.sendStatus.getCall(0).args[0]).toEqual(401);
    expect(res.header.getCall(0).args[0]).toEqual('WWW-Authenticate');
    expect(res.header.getCall(0).args[1]).toEqual(`Bearer realm="myapi", error="invalid_token", error_description="Token cannot be authenticated"`);
  });
});

describe('Authenticate Body token', () => {
  test('If the token in Body is correct, next() should be called', () => {
    // Token authentication middleware initialization.
    const middleware = initBearerValidator({tokenLocation: 'body', tokenParameter: 'access_token'});

    // Run middleware.
    const req = mockReq({body: {access_token: 'mytoken123'}});
    const res = mockRes();
    const next = sinon.spy();// Monitor calls to next().
    middleware(req, res, next);

    // The token is correct and next() should be called.
    expect(next.calledOnce).toEqual(true);
  });

  test('If there is no token parameter in Body, it should be a 401 response', () => {
    // Token authentication middleware initialization.
    const middleware = initBearerValidator({tokenLocation: 'body', tokenParameter: 'access_token'});

    // Run middleware.
    const req = mockReq({body: {}});
    const res = mockRes();
    const next = sinon.spy();// Monitor calls to next().
    middleware(req, res, next);

    // Check that it is the expected response.
    expect(res.sendStatus.getCall(0).args[0]).toEqual(401);
    expect(res.header.getCall(0).args[0]).toEqual('WWW-Authenticate');
    expect(res.header.getCall(0).args[1]).toEqual(`Bearer realm="myapi", error="token_required"`);
  });

  test('If the Body tokens do not match, the response should be a 401 response', () => {
    // Token authentication middleware initialization.
    const middleware = initBearerValidator({tokenLocation: 'body', tokenParameter: 'access_token'});

    // Run middleware.
    const req = mockReq({body: {access_token: 'mytoken456'}});
    const res = mockRes();
    const next = sinon.spy();// Monitor calls to next().
    middleware(req, res, next);

    // Check that it is the expected response.
    expect(res.sendStatus.getCall(0).args[0]).toEqual(401);
    expect(res.header.getCall(0).args[0]).toEqual('WWW-Authenticate');
    expect(res.header.getCall(0).args[1]).toEqual(`Bearer realm="myapi", error="invalid_token", error_description="Token cannot be authenticated"`);
  });
});