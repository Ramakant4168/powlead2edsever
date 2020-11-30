"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchAnchorsWithPageInfo = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bluebird = _interopRequireDefault(require("bluebird"));

var _axios = _interopRequireDefault(require("axios"));

var _puppeteer = _interopRequireDefault(require("puppeteer"));

var _validateAnchor = require("./utils/validateAnchor");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var fetchAnchorsWithPageInfo = function fetchAnchorsWithPageInfo(_ref) {
  var url = _ref.url;
  return new _bluebird["default"](function (resolve, reject) {
    return scapAnchorTags(url).then(function (tags) {
      return _bluebird["default"].map(tags, function (linkObj) {
        return getPageInfo(linkObj);
      }, {
        concurrency: 10
      });
    }).then(function (result) {
      var filteredResult = result.filter(function (element) {
        return element != null;
      });
      var response = {
        message: 'Success',
        data: filteredResult
      };
      resolve(response);
    })["catch"](function (error) {
      reject(error);
    });
  });
};

exports.fetchAnchorsWithPageInfo = fetchAnchorsWithPageInfo;

var scapAnchorTags =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(url) {
    var browser, page, links, filteredUrls;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _puppeteer["default"].launch();

          case 2:
            browser = _context.sent;
            _context.next = 5;
            return browser.newPage();

          case 5:
            page = _context.sent;
            _context.next = 8;
            return page["goto"](url, {
              waitUntil: 'load',
              timeout: 0
            });

          case 8:
            _context.next = 10;
            return page.evaluate(function () {
              return Array.from(document.querySelectorAll('a')).map(function (anchor) {
                return {
                  link: anchor.href,
                  text: anchor.textContent
                };
              });
            });

          case 10:
            links = _context.sent;
            _context.next = 13;
            return browser.close();

          case 13:
            filteredUrls = (0, _validateAnchor.filterValidUrl)(links, url);
            return _context.abrupt("return", filteredUrls);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function scapAnchorTags(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var getPageInfo = function getPageInfo(urlObj) {
  return _axios["default"].get(urlObj.link).then(function (response) {
    var header = response.headers;
    var contentEncoding = header['content-encoding'] || header['transfer-encoding'] || "NA";
    var serverInfo = header.server || 'unknown';
    var contentLenght = header['content-length'] || 0;

    var obj = _objectSpread({}, urlObj, {
      contentEncoding: contentEncoding,
      serverInfo: serverInfo,
      contentLenght: contentLenght
    });

    return obj;
  })["catch"](function (error) {
    return null;
  });
};