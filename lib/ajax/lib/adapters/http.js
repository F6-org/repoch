'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = httpAdapter;

var _utils = require('./../utils');

var _utils2 = _interopRequireDefault(_utils);

var _settle = require('./../core/settle');

var _settle2 = _interopRequireDefault(_settle);

var _buildURL = require('./../helpers/buildURL');

var _buildURL2 = _interopRequireDefault(_buildURL);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _followRedirects = require('follow-redirects');

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _zlib = require('zlib');

var _zlib2 = _interopRequireDefault(_zlib);

var _buffer = require('buffer');

var _createError = require('../core/createError');

var _createError2 = _interopRequireDefault(_createError);

var _enhanceError = require('../core/enhanceError');

var _enhanceError2 = _interopRequireDefault(_enhanceError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*eslint consistent-return:0*/
function httpAdapter(config) {
  return new Promise(function dispatchHttpRequest(resolve, reject) {
    var data = config.data;
    var headers = config.headers;
    var timer;
    var aborted = false;

    // Set User-Agent (required by some servers)
    // Only set header if it hasn't been set in config
    // See https://github.com/mzabriskie/axios/issues/69
    if (!headers['User-Agent'] && !headers['user-agent']) {
      headers['User-Agent'] = 'axios/' + '0.15.3';
    }

    if (data && !_utils2.default.isStream(data)) {
      if (_utils2.default.isArrayBuffer(data)) {
        data = new _buffer.Buffer(new Uint8Array(data));
      } else if (_utils2.default.isString(data)) {
        data = new _buffer.Buffer(data, 'utf-8');
      } else {
        return reject((0, _createError2.default)('Data after transformation must be a string, an ArrayBuffer, or a Stream', config));
      }

      // Add Content-Length header if data exists
      headers['Content-Length'] = data.length;
    }

    // HTTP basic authentication
    var auth = undefined;
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      auth = username + ':' + password;
    }

    // Parse url
    var parsed = _url2.default.parse(config.url);
    var protocol = parsed.protocol || 'http:';

    if (!auth && parsed.auth) {
      var urlAuth = parsed.auth.split(':');
      var urlUsername = urlAuth[0] || '';
      var urlPassword = urlAuth[1] || '';
      auth = urlUsername + ':' + urlPassword;
    }

    if (auth) {
      delete headers.Authorization;
    }

    var isHttps = protocol === 'https:';
    var agent = isHttps ? config.httpsAgent : config.httpAgent;

    var options = {
      hostname: parsed.hostname,
      port: parsed.port,
      path: (0, _buildURL2.default)(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ''),
      method: config.method,
      headers: headers,
      agent: agent,
      auth: auth
    };

    var proxy = config.proxy;
    if (!proxy) {
      var proxyEnv = protocol.slice(0, -1) + '_proxy';
      var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
      if (proxyUrl) {
        var parsedProxyUrl = _url2.default.parse(proxyUrl);
        proxy = {
          host: parsedProxyUrl.hostname,
          port: parsedProxyUrl.port
        };

        if (parsedProxyUrl.auth) {
          var proxyUrlAuth = parsedProxyUrl.auth.split(':');
          proxy.auth = {
            username: proxyUrlAuth[0],
            password: proxyUrlAuth[1]
          };
        }
      }
    }

    if (proxy) {
      options.hostname = proxy.host;
      options.host = proxy.host;
      options.headers.host = parsed.hostname + (parsed.port ? ':' + parsed.port : '');
      options.port = proxy.port;
      options.path = protocol + '//' + parsed.hostname + (parsed.port ? ':' + parsed.port : '') + options.path;

      // Basic proxy authorization
      if (proxy.auth) {
        var base64 = new _buffer.Buffer(proxy.auth.username + ':' + proxy.auth.password, 'utf8').toString('base64');
        options.headers['Proxy-Authorization'] = 'Basic ' + base64;
      }
    }

    var transport;
    if (config.maxRedirects === 0) {
      transport = isHttps ? _https2.default : _http2.default;
    } else {
      if (config.maxRedirects) {
        options.maxRedirects = config.maxRedirects;
      }
      transport = isHttps ? _followRedirects.httpsFollow : _followRedirects.httpFollow;
    }

    // Create the request
    var req = transport.request(options, function handleResponse(res) {
      if (aborted) return;

      // Response has been received so kill timer that handles request timeout
      clearTimeout(timer);
      timer = null;

      // uncompress the response body transparently if required
      var stream = res;
      switch (res.headers['content-encoding']) {
        /*eslint default-case:0*/
        case 'gzip':
        case 'compress':
        case 'deflate':
          // add the unzipper to the body stream processing pipeline
          stream = stream.pipe(_zlib2.default.createUnzip());

          // remove the content-encoding in order to not confuse downstream operations
          delete res.headers['content-encoding'];
          break;
      }

      var response = {
        status: res.statusCode,
        statusText: res.statusMessage,
        headers: res.headers,
        config: config,
        request: req
      };

      if (config.responseType === 'stream') {
        response.data = stream;
        (0, _settle2.default)(resolve, reject, response);
      } else {
        var responseBuffer = [];
        stream.on('data', function handleStreamData(chunk) {
          responseBuffer.push(chunk);

          // make sure the content length is not over the maxContentLength if specified
          if (config.maxContentLength > -1 && _buffer.Buffer.concat(responseBuffer).length > config.maxContentLength) {
            reject((0, _createError2.default)('maxContentLength size of ' + config.maxContentLength + ' exceeded', config));
          }
        });

        stream.on('error', function handleStreamError(err) {
          if (aborted) return;
          reject((0, _enhanceError2.default)(err, config));
        });

        stream.on('end', function handleStreamEnd() {
          var responseData = _buffer.Buffer.concat(responseBuffer);
          if (config.responseType !== 'arraybuffer') {
            responseData = responseData.toString('utf8');
          }

          response.data = responseData;
          (0, _settle2.default)(resolve, reject, response);
        });
      }
    });

    // Handle errors
    req.on('error', function handleRequestError(err) {
      if (aborted) return;
      reject((0, _enhanceError2.default)(err, config));
    });

    // Handle request timeout
    if (config.timeout && !timer) {
      timer = setTimeout(function handleRequestTimeout() {
        req.abort();
        reject((0, _createError2.default)('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED'));
        aborted = true;
      }, config.timeout);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (aborted) {
          return;
        }

        req.abort();
        reject(cancel);
        aborted = true;
      });
    }

    // Send the request
    if (_utils2.default.isStream(data)) {
      data.pipe(req);
    } else {
      req.end(data);
    }
  });
};
//# sourceMappingURL=http.js.map