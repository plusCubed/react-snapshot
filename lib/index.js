'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPrerendering = exports.render = undefined;

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var render = exports.render = function render(rootComponent, domElement) {
  if (isPrerendering()) {
    domElement.innerHTML = window.ReactDOMServer.renderToString(rootComponent);
    window.reactSnapshotRender();
  } else {
    _reactDom2.default.render(rootComponent, domElement);
  }
};

var isPrerendering = exports.isPrerendering = function isPrerendering() {
  return navigator.userAgent.match(/Node\.js/i) && window && window.reactSnapshotRender && window.ReactDOMServer;
};