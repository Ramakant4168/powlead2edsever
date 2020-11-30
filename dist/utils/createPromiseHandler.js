"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(promiser) {
  return function (req, res, next) {
    var promise = promiser(req, res, next);

    if (promise && typeof promise.then === 'function') {
      promise.then(function (response) {
        if (!res.headersSent) {
          res.status(200).send(response);
        }
      })["catch"](function (error) {
        console.error(error);

        if (!res.headersSent) {
          var _error$status = error.status,
              status = _error$status === void 0 ? 500 : _error$status,
              _error$message = error.message,
              message = _error$message === void 0 ? '' : _error$message;
          res.status(status).send({
            status: status,
            message: message
          });
        }
      });
    } else {
      console.log('return promise from handler');
    }
  };
};

exports["default"] = _default;