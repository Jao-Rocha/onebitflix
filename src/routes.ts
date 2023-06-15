//aqui incluimos as rotas na aplicaçao, as ordens aqui sao importantes
import express from 'express'
import { categoriesController } from './controlers/categoriesController'
import { coursesController } from './controlers/coursesController'

const router = express.Router()

//no metodo get ele pede a rota e funçao de callback
// aqui primeiro se informa o metodo pro banco , como get , dps o caminho , ddps chama o controler e o metodo que sera executado ao entrar na rota
router.get('/categories', categoriesController.index)
router.get('/categories/:id', categoriesController.show)

router.get('/courses/featured', coursesController.featured)
router.get('/courses/:id', coursesController.show) //quando se tem varialvel dinamica como o id , ela precisa ficar abaixo dos outros caminhos
//se fosse invertido o featured seria entedido como um id

export { router }
