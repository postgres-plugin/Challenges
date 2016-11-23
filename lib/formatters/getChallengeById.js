'use strict';

module.exports = function (data) {
  var tags;

  if (!data) {
    return data;
  }
  tags = data.map(function (obj) {
    return {
      id: obj.tags_id,
      name: obj.tags_name
    };
  });
  delete data[0].tags_id;
  data[0].tags = tags;

  return data[0];
};
