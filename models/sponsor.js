'use strict';
module.exports = function(sequelize, DataTypes) {
  var Sponsor = sequelize.define('Sponsor', {
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
  return Sponsor;
};
