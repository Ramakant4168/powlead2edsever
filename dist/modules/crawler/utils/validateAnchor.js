"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterValidUrl = void 0;

/* eslint-disable prefer-named-capture-group */
var filterValidUrl = function filterValidUrl(links, pUrl) {
  var parentUrl = new URL(pUrl);
  var filteredUrl = links.filter(function (linkObj) {
    var url = linkObj.link; // eslint-disable-next-line require-unicode-regexp
    // eslint-disable-next-line no-useless-escape

    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

    if (regex.test(url)) {
      var childUrl = new URL(url);

      if (parentUrl.origin === childUrl.origin) {
        linkObj.isUrlRelative = 'Yes';
      } else {
        linkObj.isUrlRelative = 'External';
      }

      return linkObj;
    }
  });
  filteredUrl.forEach(function (element) {
    element.text = element.text.replace(/(\r\n|\n|\r|\t)/gm, '');
    element.text = element.text.replace(/\s\s+/g, ' ');
    element.text = element.text.trim();

    if (!element.text.trim()) {
      element.text = 'No Text';
    }
  });
  return filteredUrl;
};

exports.filterValidUrl = filterValidUrl;