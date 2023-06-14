import express from 'express'
import { categoriesController } from './controlers/categoriesController'

const router = express.Router()

//no metodo get ele pede a rota e funçao de callback
router.get('/categories', categoriesController.index)
router.get('/categories/:id', categoriesController.show)

export { router }
