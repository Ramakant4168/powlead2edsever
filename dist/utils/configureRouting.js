"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createRouting;

var _express = require("express");

var _lodash = require("lodash");

var _Handler = _interopRequireDefault(require("./404Handler"));

function createRouting(routes) {
  if (!Array.isArray(routes)) {
    routes = [routes];
  }

  var router = (0, _express.Router)();
  (0, _lodash.compact)(routes).forEach(function (_ref) {
    var path = _ref.path,
        _ref$method = _ref.method,
        method = _ref$method === void 0 ? 'get' : _ref$method,
        _ref$handler = _ref.handler,
        handler = _ref$handler === void 0 ? (0, _Handler["default"])() : _ref$handler,
        subRoutes = _ref.subRoutes;

    if (path) {
      router[method](path, handler);

      if (subRoutes) {
        router.use(path, createRouting(subRoutes));
      }
    }
  });
  return router;
}