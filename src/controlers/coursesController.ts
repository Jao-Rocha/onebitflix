import { Request, Response } from 'express'
import { courseService } from '../services/courseService'

export const coursesController = {
  //GET /courses/:id

  show: async (req: Request, res: Response) => {
    const { id } = req.params

    try {
      const course = await courseService.findbyIdWithEpisodes(id)
      return res.json(course)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }
  }
}
