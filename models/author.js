"use strict";

module.exports = function(sequelize, DataTypes) {
  var Author = sequelize.define("Author", {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(db) {
        // associations can be defined here
        Author.hasMany(db.Post);
      }
    }
  });

  return Author;
};
