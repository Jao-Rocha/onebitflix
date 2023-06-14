import { Request, Response } from 'express'
import { categoryService } from '../services/categoryService'
import { getPaginationParams } from '../helpers/getPaginationParams'
//quando for criar uma rota no express , ela precisa do seu caminho e uma funçao de callback para quando ela for chamada, esse controller segue o padraod as rotas do express
export const categoriesController = {
  //GET /categories
  index: async (req: Request, res: Response) => {
    //pega os parametros da paginaçao
    const [page, perPage] = getPaginationParams(req.query)

    try {
      //chama o service
      const paginatedCategories = await categoryService.findAllPaginated(
        page,
        perPage
      )

      return res.json(paginatedCategories)
    } catch (error) {
      //se o erro for uma instancia Error do javascript
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }
  },

  //GET /categories/id
  show: async (req: Request, res: Response) => {
    const { id } = req.params

    try {
      const category = await categoryService.findByIdWithCourses(id)
      return res.json(category)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }
  }
}
