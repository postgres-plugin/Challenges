'use strict';

var test = require('tape');
var initServer = require('../example/server.js');
var initialTablesData = require('../fixtures/importMockData.js');

var config = require('../config/load-config.js');

function setup (configData, cb) {
  initialTablesData(config, function () {
    initServer(config, function (error, server, pool) {
      if (error) {
        return cb(false);
      }

      return cb(error, server, pool);
    });
  });
}

test('Server start ok', function (t) {
  setup(config, function (error, server, pool) {
    if (error) {
      return t.fail('Error starting the server, error: ', error);
    }

    return server.inject({ method: 'GET', url: '/' }, function (res) {
      t.equal(res.payload, '[]', 'server is up and running!');

      return pool.end(function () {
        server.stop(t.end);
      });
    });
  });
});

test('getChallenge for challengeId = 2', function (t) {
  setup(config, function (error, server, pool) {
    if (error) {
      return t.fail('Error starting the server, error: ', error);
    }

    return server.inject({ method: 'GET', url: '/getChallenge' },
      function (res) {
        var expected = '[{'
          + '"chal_id":2,"chal_title":"Challenge Number 2",'
          + '"chal_desc":"How can I...?","tags_name":"Corporate",'
          + '"org_id":1,"tags_id":2'
          + '}]';
        t.equal(res.payload, expected, 'server is up and running!');

        return pool.end(function () {
          server.stop(t.end);
        });
      });
  });
});
