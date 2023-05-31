'use strict'
//medoto up para fazer a açao no banco de dados e metodo down para remover a açao

module.exports = {
  async up(queryInterface, Sequelize) {
    //usando o metodo bulkInsert que envia um array de dados para popular o banco
    await queryInterface.bulkInsert(
      'categories',
      [
        {
          name: 'Tecnologias Back-end',
          position: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Tecnologias Front-end',
          position: 2,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Ferramentas de Desenvolvimento',
          position: 3,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Soft-skills',
          position: 4,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Carreira',
          position: 5,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    // o contrario do bulkInsert , vai excluir varios itens ao mesmo tempo , passando o nome  da tabela
    await queryInterface.bulkDelete('categories', null, {})
  }
}
