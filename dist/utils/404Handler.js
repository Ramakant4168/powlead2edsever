"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$text = _ref.text,
      text = _ref$text === void 0 ? '404. Not found' : _ref$text,
      _ref$status = _ref.status,
      status = _ref$status === void 0 ? 404 : _ref$status;

  return function (_req, res) {
    res.status(status).send(text);
  };
};

exports["default"] = _default;