import { Category } from './Category'
import { Course } from './Course'

//criando a associação abaixo
Category.hasMany(Course) //hasMany significa que tem muitas , por exemplo , uma categoria pode ter muitos cursos, é passado de parametro o Course
Course.belongsTo(Category) //significa que pertence a tabela Category
export { Category, Course }
