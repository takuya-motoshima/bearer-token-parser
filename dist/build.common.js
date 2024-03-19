"use strict";Object.defineProperty(exports,"__esModule",{value:!0});class e{static REGEX_BEARER_TOKEN=/^Bearer\s+([A-Za-z0-9\-\._~\+\/]+)=*$/;static parseBearerToken(e){return this.parseBearerTokenHeader(e)}static parseBearerTokenHeader(r){if(!r.headers||!r.headers.authorization)return;const t=r.headers.authorization.match(e.REGEX_BEARER_TOKEN);return t?t[1]:void 0}static parseBearerTokenQuery(e,r="access_token"){if(e.query&&e.query[r])return e.query[r]}static parseBearerTokenBody(e,r="access_token"){if(e.body&&e.body[r])return e.body[r]}}var r=e=>e&&e.constructor&&e.constructor===Object.getPrototypeOf((async function(){})).constructor;exports.BearerParser=e,exports.BearerValidator=class{static validation(t){if(("query"===(t=Object.assign({tokenLocation:"header",tokenParameter:"access_token",realm:"",tokenCheckCallback:void 0,requestParameterCheck:void 0},t||{})).tokenLocation||"body"===t.tokenLocation)&&!t.tokenParameter)throw new TypeError("If the token location is `query` or body`, the token parameter name is required");return async(a,o,n)=>{if(!(("header"!==t.tokenLocation||a.headers&&a.headers.authorization)&&("query"!==t.tokenLocation||a.query&&a.query.hasOwnProperty(t.tokenParameter))&&("body"!==t.tokenLocation||a.body&&a.body.hasOwnProperty(t.tokenParameter))))return void this.resWithWwwAuthenticate(o,401,t.realm,"token_required");let i;switch(t.tokenLocation){case"header":i=e.parseBearerTokenHeader(a);break;case"query":i=e.parseBearerTokenQuery(a,t.tokenParameter);break;case"body":i=e.parseBearerTokenBody(a,t.tokenParameter);break;default:throw new TypeError("token location is invalid value, can be any of `header`, `query`, or `body`")}if(i){if(t.tokenCheckCallback){if(!(r(t.tokenCheckCallback)?await t.tokenCheckCallback(i):t.tokenCheckCallback(i)))return void this.resWithWwwAuthenticate(o,401,t.realm,"invalid_token","Token cannot be authenticated")}if(t.requestParameterCheck){if(!(r(t.requestParameterCheck)?await t.requestParameterCheck(a):t.requestParameterCheck(a)))return void this.resWithWwwAuthenticate(o,400,t.realm,"invalid_request")}n()}else this.resWithWwwAuthenticate(o,401,t.realm,"invalid_token","Token format error")}}static resWithWwwAuthenticate(e,r,t,a,o){let n=`Bearer realm="${t}"`;a&&(n+=`, error="${a}"`),o&&(n+=`, error_description="${o}"`),e.header("WWW-Authenticate",n).sendStatus(r)}};
