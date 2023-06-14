import { Category } from '../models'

export const categoryService = {
  findAllPaginated: async (page: number, perPage: number) => {
    // o  offset no sql faz o pulo de registro para visualizar apenas a pagina desejada
    const offset = (page - 1) * perPage

    //aqui vai buscar todos os registros no banco , relacionado a category , usando o findAndCountAll(vai retornar e contar todos) e retornando as propriedasdes passadas , além de ordenar de forma crescente em realaçao a position
    const { count, rows } = await Category.findAndCountAll({
      attributes: ['id', 'name', 'position'],
      order: [['position', 'ASC']],
      limit: perPage,
      offset: offset
    })
    return {
      categories: rows,
      page: page,
      perPage: perPage,
      total: count
    }
  },

  findByIdWithCourses: async (id: string) => {
    //encontrar pela chave primaria o id
    const categoryWithCourses = await Category.findByPk(id, {
      attributes: ['id', 'name'],
      include: {
        association: 'courses',
        attributes: [
          'id',
          'name',
          'synopsis',
          ['thumbnail_url', 'thumbnailUrl']
        ] // foi renomeada a thumbnail
      }
    })
    return categoryWithCourses
  }
}
