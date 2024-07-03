// seeders/20240629102000-demo-faculty.js

"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "faculties",
      [
        {
          name: "Mühendislik Fakültesi",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Temel Bilimler Fakültesi",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Eğitim Fakültesi",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Fen-Edebiyat Fakültesi",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "İktisadi ve İdari Bilimler Fakültesi",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Mimarlık ve Tasarım Fakültesi",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("faculties", null, {});
  },
};
