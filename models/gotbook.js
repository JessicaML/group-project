'use strict';
module.exports = function(sequelize, DataTypes) {
  var Gotbook = sequelize.define('Gotbook', {
    BookId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Books',
        key: 'id'
      }
    },    ReaderId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Readers',
        key: 'id'
      }
    }

  }, {
    classMethods: {
      associate: function(models) {
        this.belongsTo(models.Book);
        this.belongsTo(models.Reader);

        // associations can be defined here
      }
    }
  });
  return Gotbook;
};
