const bcrypt = require('bcryptjs');

'use strict';
module.exports = function(sequelize, DataTypes) {
  var Sponsor = sequelize.define('Sponsor', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: {
      type: DataTypes.VIRTUAL,
      set: function(password) {
        this.setDataValue('passwordDigest', bcrypt.hashSync(password, 10));
      }
    },
    about: DataTypes.STRING,
    passwordDigest: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Sponsor;
};
