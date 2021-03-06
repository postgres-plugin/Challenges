'use strict';

var add = require('./add.js');
var edit = require('./edit.js');
var getById = require('./getById.js');
var getByTag = require('./getByTag.js');
var getAllActive = require('./getAllActive.js');
var checkEditable = require('./checkEditable.js');
var toggleActive = require('./toggleActive.js');
var getMatchingOrgs = require('./getMatchingOrgs.js');
var getMatchingChallenges = require('./getMatchingChallenges.js');
var getArchived = require('./getArchived.js');
var getUsersArchived = require('./getUsersArchived.js');
var challengesSearch = require('./search.js');
var getByOrgId = require('./getByOrgId.js');
var addComment = require('./addComment.js');
var getComment = require('./getComment.js');
var getComments = require('./getComments.js');
var deleteComment = require('./deleteComment.js');
var editComment = require('./editComment.js');
var flagComment = require('./flagComment.js');
var getCommentInfo = require('./getCommentInfo.js');
var getByTagsAndLocations = require('./getByTagsAndLocations.js');
var addLocations = require('./addLocations.js');
var addTags = require('./addTags.js');
var getOwnerChallenge = require('./getOwnerChallenge.js');
var getUsersChallenges = require('./getUsersChallenges.js');
var challengeEditable = require('./challengeEditable.js');
var deleteChallenge = require('./deleteChallenge.js');

module.exports = {
  add: add,
  edit: edit,
  getById: getById,
  getByTag: getByTag,
  getAllActive: getAllActive,
  checkEditable: checkEditable,
  toggleActive: toggleActive,
  getMatchingOrgs: getMatchingOrgs,
  getMatchingChallenges: getMatchingChallenges,
  getArchived: getArchived,
  getUsersArchived: getUsersArchived,
  challengesSearch: challengesSearch,
  getByOrgId: getByOrgId,
  addComment: addComment,
  getComment: getComment,
  getComments: getComments,
  deleteComment: deleteComment,
  editComment: editComment,
  flagComment: flagComment,
  getCommentInfo: getCommentInfo,
  getByTagsAndLocations: getByTagsAndLocations,
  addTags: addTags,
  addLocations: addLocations,
  getOwnerChallenge: getOwnerChallenge,
  getUsersChallenges: getUsersChallenges,
  challengeEditable,
  deleteChallenge
};
