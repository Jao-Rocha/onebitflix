'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    //sempre passando o nome da tabela e suas caracteristicas
    await queryInterface.createTable('episodes', {
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
      order: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
      },
      video_url: {
        type: Sequelize.DataTypes.STRING
      },
      seconds_long: {
        type: Sequelize.DataTypes.INTEGER
      },
      course_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: 'courses', key: 'id' },
        onUpdate: 'CASCADE',
        //nao seja possivel excluir um curso caso tenha algum episodios
        onDelete: 'RESTRICT'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('episodes')
  }
}
