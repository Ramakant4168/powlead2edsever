"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _crawler = require("./crawler.controller");

var routes = {
  path: '/crawler',
  subRoutes: [{
    path: '/get-page-info',
    method: 'post',
    handler: _crawler.getAnchorsWithPageInfo
  }]
};
var _default = {
  routes: routes
};
exports["default"] = _default;