'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsdom = require('jsdom');

var _jsdom2 = _interopRequireDefault(_jsdom);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Wraps a jsdom call and returns the full page */

exports.default = function (protocol, host, path, delay) {
  return new Promise(function (resolve, reject) {
    var reactSnapshotRenderCalled = false;
    _jsdom2.default.env({
      url: protocol + '//' + host + path,
      headers: {
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
      },
      resourceLoader: function resourceLoader(resource, callback) {
        if (resource.url.host === host) {
          resource.defaultFetch(callback);
        } else {
          callback();
        }
      },

      features: {
        FetchExternalResources: ['script'],
        ProcessExternalResources: ['script'],
        SkipExternalResources: false
      },
      virtualConsole: _jsdom2.default.createVirtualConsole().sendTo(console),
      created: function created(err, window) {
        if (err) reject(err);
        window.ReactDOMServer = _server2.default;
        window.requestAnimationFrame = function (cb) {
          setTimeout(cb, 0);
        };
        window.reactSnapshotRender = function () {
          reactSnapshotRenderCalled = true;
          setTimeout(function () {
            resolve(window);
          }, delay);
        };
      },
      done: function done(err, window) {
        if (!reactSnapshotRenderCalled) {
          reject("'render' from react-snapshot was never called. Did you replace the call to ReactDOM.render()?");
        }
      }
    });
  });
};

module.exports = exports['default'];