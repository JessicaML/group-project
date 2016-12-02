'use strict';
module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    imgURL: DataTypes.STRING,
    slug: DataTypes.STRING,
    description: DataTypes.STRING,
    SponsorId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Sponsors',
        key: 'id'
      }
    }

  }, {
    classMethods: {
      associate: function(models) {
        this.belongsTo(models.Sponsor);
        this.hasMany(models.Comment);

        // associations can be defined here
      }
    }
  });
  return Book;
};
