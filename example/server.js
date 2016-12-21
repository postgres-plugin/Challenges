'use strict';

var Hapi = require('hapi');
var Hoek = require('hoek');
var challenges = require('../lib/index.js');
var pg = require('pg');
var pgPeople = require('pg-people');
var tagsSystem = require('tags-system');

var data = require('ce100-mock-data');

function init (config, callback) {
  var server = new Hapi.Server();
  var pool = new pg.Pool(config.pg);
  var optionsTags = {
    reset: true,
    tags: data.tags,
    categories: data.categories,
    pool: pool
  };
  var optionsPeople = {
    pool: pool,
    reset: true,
    people: data.people,
    organisations: data.organisations,
    tags_organisations: data.tags_organisations
  };
  var optionsChallenges = {
    pool: pool,
    reset: true,
    challenges: data.challenges,
    tags_challenges: data.tags_challenges
  };

  server.connection({ port: config.port });

  return server.register({
    register: tagsSystem,
    options: optionsTags
  }, function (errorTags) {
    if (errorTags) {
      console.log('tags', errorTags); // eslint-disable-line

      return callback(errorTags);
    }

    return server.register({
      register: pgPeople,
      options: optionsPeople
    }, function (errorPeople) {
      if (errorPeople) {
        console.log('people', errorPeople); // eslint-disable-line

        return callback(errorPeople);
      }

      return server.register({
        register: challenges,
        options: optionsChallenges
      }, function (challengesErr) {
        if (challengesErr) {
          return callback(challengesErr);
        }

        server.route([
          {
            method: 'GET',
            path: '/',
            handler: function (request, reply) {
              var obj = {
                title: 'Tea',
                description: 'With milk',
                org_id: 1,
                creator_id: 1,
                active: false
              };

              request.server.methods.pg.challenges.add(obj, function (error, response) { // eslint-disable-line
                Hoek.assert(!error, 'Add Challenge failed');
                reply(response);
              });
            }
          }, {
            method: 'POST',
            path: '/edit',
            handler: function (request, reply) {
              var challengeId = request.query.id;

              request.server.methods.pg.challenges.edit(challengeId, request.payload, function (error, response) { //eslint-disable-line
                Hoek.assert(!error, 'edit failed');
                reply(response);
              });
            }
          }, {
            method: 'GET',
            path: '/getById',
            handler: function (request, reply) {
              var challengeId = request.query.id;

              request.server.methods.pg.challenges.getById(challengeId, function (error, response) { //eslint-disable-line
                Hoek.assert(!error, 'getById failed');
                reply(response);
              });
            }
          }, {
            method: 'GET',
            path: '/getByTag',
            handler: function (request, reply) {
              var tagId = request.query.tagId;

              request.server.methods.pg.challenges.getByTag(tagId, function (error, response) { // eslint-disable-line
                Hoek.assert(!error, 'getByTag failed');
                reply(response);
              });
            }
          }, {
            method: 'GET',
            path: '/getAllActive',
            handler: function (request, reply) {
              request.server.methods.pg.challenges.getByTag(false, function (error, response) { // eslint-disable-line
                Hoek.assert(!error, 'getAllActive failed');
                reply(response);
              });
            }
          }, {
            method: 'GET',
            path: '/checkEditable',
            handler: function (request, reply) {
              var userId = request.query.userId;
              var chalId = request.query.chalId;

              request.server.methods.pg.challenges.checkEditable(userId, chalId, function (error, response) { // eslint-disable-line
                Hoek.assert(!error, 'checkEditable failed');
                reply(response);
              });
            }
          }, {
            method: 'POST',
            path: '/toggleActive',
            handler: function (request, reply) {
              var chalId = request.query.id;

              request.server.methods.pg.challenges.toggleActive(chalId, function (error, response) { // eslint-disable-line
                Hoek.assert(!error, 'toggleActive failed');
                reply(response);
              });
            }
          }, {
            method: 'GET',
            path: '/getMatchingOrgs',
            handler: function (request, reply) {
              var chalId = request.query.chal_id;

              request.server.methods.pg.challenges.getMatchingOrgs(chalId, function (error, response) { // eslint-disable-line
                Hoek.assert(!error, 'toggleActive failed');
                reply(response);
              });
            }
          }
        ]);

        return server.start(function (errorStart) {
          return callback(errorStart, server, pool);
        });
      });
    });
  });
}

module.exports = init;
