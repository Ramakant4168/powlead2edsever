"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAnchorsWithPageInfo = void 0;

var _utils = require("../../utils");

var _crawler = require("./crawler.service");

var getAnchorsWithPageInfo = (0, _utils.createPromiseHandler)(function (_ref) {
  var body = _ref.body;

  if (!body) {
    return Promise.reject(new Error('Input not valid'));
  }

  return (0, _crawler.fetchAnchorsWithPageInfo)(body);
});
exports.getAnchorsWithPageInfo = getAnchorsWithPageInfo;