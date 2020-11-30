"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

var _routesConfig = _interopRequireDefault(require("./routes-config"));

var _cors = _interopRequireDefault(require("cors"));

var _process$env$port = process.env.port,
    port = _process$env$port === void 0 ? 3000 : _process$env$port;
var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_express["default"].json({
  limit: '50mb'
}));
app.use(_express["default"].urlencoded({
  extended: true
}));
(0, _routesConfig["default"])(app);
app.use(function (err, req, res, next) {
  res.locals.error = err;
  var status = err.status || 500;
  res.status(status);
  res.send('Something Went Wrong');
});
app.listen(port, function () {
  console.log("listening on port ".concat(port));
});