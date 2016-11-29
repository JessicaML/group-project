'use strict';
module.exports = function(sequelize, DataTypes) {
  var Reader = sequelize.define('Reader', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    aboutme: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Reader;
};
