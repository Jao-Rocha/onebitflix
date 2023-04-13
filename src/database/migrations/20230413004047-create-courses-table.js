'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      synopsis: {
        allowNull: false,
        type: Sequelize.DataTypes.TEXT
      },
      thumbnail_url: {
        type: Sequelize.DataTypes.STRING
      },
      featured: {
        defaultValue: false,
        type: Sequelize.DataTypes.BOOLEAN
      },
      category_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        //referenciando chave estrangeira , em relação a outra tabela
        references: { model: 'categories', key: 'id' },
        //caso alguma categoria seja atualizada , ela seja atualizada aqui , ela cascateie
        onUpdate: 'CASCADE',
        //resstringe a exclusão de alguma categoria que tenha algum curso
        onDelete: 'RESTRICT'
      },
      //data de criação
      created_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE
      },
      //data de atualização
      updated_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('courses')
  }
}
