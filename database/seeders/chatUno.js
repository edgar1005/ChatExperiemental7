'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('chats1',
    [{
      msg: "Hola!",
      user: 1,
      name: "Alan",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      msg: "Holaaaaaa",
      user: 2,
      name: "Brito",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      msg: "Ya quedo el chat?",
      user: 1,
      name: "Alan",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      msg: "nel :c",
      user: 2,
      name: "Brito",
      createdAt: new Date(),
      updatedAt: new Date()
    }]
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('chats1', null, {});
  }
};