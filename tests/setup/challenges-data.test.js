'use strict';

var test = require('tape');
var challengesData = require('../../lib/fixtures/challenges-data.js');

var challenge = [{
  title: 'A title',
  description: 'A desc',
  date: 1479491066104,
  org_id: 1,
  creator_id: 2,
  active: true
}];

var query = challengesData(challenge);

var expected = 'INSERT INTO challenges '
+ '(title, description, date, org_id, creator_id, active) VALUES ('
+ "'A title', 'A desc', 1479491066104, 1, 2, true);";

test('Converts array of challenges to .sql query', function (t) {
  t.equal(query, expected, 'Query to add challenges');
  t.end();
});
