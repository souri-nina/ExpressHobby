'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cooking = sequelize.define('Cooking', {
    Recipe: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Cooking.associate = function(models) {
    // associations can be defined here
  };
  return Cooking;
};