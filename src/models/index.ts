import { Category } from './Category'
import { Course } from './Course'
import { Episode } from './Episode'
import { User } from './User'

//criando a associação abaixo
Category.hasMany(Course, { as: 'courses' }) //hasMany significa que tem muitas , por exemplo , uma categoria pode ter muitos cursos, é passado de parametro o Course
Course.belongsTo(Category) //significa que pertence a tabela Category

//mais associaçao de um pra muitos
Course.hasMany(Episode) //Course tem muitos episodes
Episode.belongsTo(Course) // episode pertence a um course

export { Category, Course, Episode, User }
