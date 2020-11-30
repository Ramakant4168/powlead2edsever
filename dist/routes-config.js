"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = require("lodash");

var _utils = require("./utils");

var _modules = _interopRequireDefault(require("./modules"));

var _default = function _default(app) {
  (0, _lodash.compact)(Object.values(_modules["default"])).forEach(function (_ref) {
    var _ref$routes = _ref.routes,
        routes = _ref$routes === void 0 ? [] : _ref$routes;
    app.use('/powlead2ed', (0, _utils.createRouting)(routes));
  });
  app.all('/*', (0, _utils.notFoundhandler)());
};

exports["default"] = _default;