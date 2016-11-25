'use strict';

var queries = require('./queries/index.js');
var formatters = require('./formatters/index.js');
var query = require('pg-helpers').query;
var initialiseQuery = require('./helpers/initialise-query.js');
var initialisePgChallenges = require('./helpers/init-pg-challenges');

function register (server, options, next) {
  var pool = options.pool;
  var initQuery = initialiseQuery(options);

  query(initQuery, pool, function (initErr) {
    if (initErr) {
      return next(initErr);
    }

    server.ext('onPreHandler', function (request, reply) {
      // initialise request.pg.challenges
      initialisePgChallenges(request)

      request.pg.challenges.addChallenge = function (chalObj, cb) {
        query(queries.addChallenge(chalObj), pool, cb);
      };


      request.pg.challenges.getChallenge = function (id, cb) {
        query(queries.getChallenge(id), pool, function (err, res) {
          cb(err, formatters.getChallengeById(res));
        });
      };


      request.pg.challenges.getChallengesByTag = function (id, cb) {
        query(queries.getChallengesByTag(id), pool, function (queryErr, rows) {
          var result = {};

          result.challenges = formatters.getChallengesByTag(rows);

          return cb(queryErr, result);
        });
      };


      reply.continue();
    });

    return next();
  });
}

register.attributes = { name: 'challenges' };

module.exports = register;
