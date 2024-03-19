const sinon = require('sinon');

/**
 * Mock Request.
 * @param {Object} options Members of the request object to be additionally mocked.
 * @return {Object} Mock Request.
 */
module.exports = options => {
  const ret = {};
  return Object.assign(ret, {
    accepts: sinon.stub().returns(ret),
    acceptsCharsets: sinon.stub().returns(ret),
    acceptsEncodings: sinon.stub().returns(ret),
    acceptsLanguages: sinon.stub().returns(ret),
    body: {},
    flash: sinon.stub().returns(ret),
    get: sinon.stub().returns(ret),
    header: sinon.stub().returns(ret),
    is: sinon.stub().returns(ret),
    params: {},
    query: {},
    session: {},
  }, options);
}