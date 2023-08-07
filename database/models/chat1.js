'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chat1 extends Model {
    static associate(models) {
    }
  }
  chat1.init({
    msg: DataTypes.STRING,
    user: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    sequelize,
    paranoid:true,
    modelName: 'chat1',
    tableName: 'chats1'
  });
  return chat1;
};