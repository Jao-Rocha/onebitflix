import AdminJS, { PageHandler } from 'adminjs'
import { Course, Episode, Category, User } from '../models'
export const dashboardOptions: {
  handler?: PageHandler
  component?: string
} = {
  //usando o bundle para passar a localizaçao do componente personalizado
  component: AdminJS.bundle('./components/Dashboard'),
  //esse handler vai ser os dados que chagaram no na api da dashboard
  handler: async (req, res, context) => {
    const courses = await Course.count()
    const episodes = await Episode.count()
    const categorys = await Category.count()
    const standardUsers = await User.count({ where: { role: 'user' } })
    //informando o formato json que vai chegar até a dashboard , formato chave valor , sendo a chave (key) uma string e o valor um number
    res.json({
      Cursos: courses,
      Episódios: episodes,
      Categorias: categorys,
      Usuários: standardUsers
    })
  }
}
