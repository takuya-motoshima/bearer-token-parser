export var name = "bearer-token-parser";
export var version = "1.0.1";
export var description = "This is a package that contains the Bearer token parsing and validation modules.";
export var _moduleAliases = {"~":"."};
export var main = "dist/build.common.js";
export var module = "dist/build.esm.js";
export var types = "types/index.d.ts";
export var scripts = {"watch":"rollup -c --watch","prewatch":"rm -rf dist types && json2module package.json > src/package.ts","build":"rollup -c","prebuild":"rm -rf dist types && json2module package.json > src/package.ts","test":"jest","start":"ts-node -r tsconfig-paths/register -P tsconfig.json -O '{\"module\":\"commonjs\"}' -e \"import * as index from '~/index';console.log(index);\"","prestart":"json2module package.json > src/package.ts"};
export var repository = {"type":"git","url":"git+https://github.com/takuya-motoshima/bearer-token-parser.git"};
export var files = ["dist/*.js","types/*.d.ts","package.json"];
export var keywords = ["node","nodejs","javascript","js","shared","library","lib","module","typescript","ts","esm","es6","bearer"];
export var author = "Takuya Motoshima <developer.takuyamotoshima@gmail.com> (https://twitter.com/TakuyaMotoshima)";
export var license = "MIT";
export var bugs = {"url":"https://github.com/takuya-motoshima/bearer-token-parser/issues","email":"developer.takuyamotoshima@gmail.com"};
export var homepage = "https://github.com/takuya-motoshima/bearer-token-parser#readme";
export var dependencies = {"bowser":"^2.10.0","express":"^4.17.1","module-alias":"^2.2.2"};
export var devDependencies = {"@types/express":"^4.17.9","@types/jest":"^26.0.3","@types/node":"^14.0.22","builtin-modules":"^3.1.0","jest":"^26.1.0","json2module":"0.0.3","rollup":"^2.21.0","rollup-plugin-commonjs":"^10.1.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-terser":"^6.1.0","rollup-plugin-typescript2":"^0.27.1","ts-loader":"^7.0.5","ts-node":"^8.10.2","tsconfig-paths":"^3.9.0","tslint":"^6.1.2","typescript":"^3.9.5"};
