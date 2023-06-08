import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import AdminJSSequelize from '@adminjs/sequelize'
import { sequelize } from '../database'
import { adminJsResources } from './resources'
import { Episode, User, Course, Category } from '../models'
import bcrypt from 'bcrypt'
import { locale } from './locale'
AdminJS.registerAdapter(AdminJSSequelize)

export const adminJS = new AdminJS({
  databases: [sequelize],
  rootPath: '/admin',
  resources: adminJsResources,
  branding: {
    companyName: 'OneBitFlix',
    logo: '/logoOnebitflix.svg',
    theme: {
      colors: {
        primary100: '#ff0043',
        primary80: '#ff1a57',
        primary60: '#ff3369',
        primary40: '#ff4d7c',
        primary20: '#ff668f',
        grey100: '#151515',
        grey80: '#333333',
        grey60: '#4d4d4d',
        grey40: '#666666',
        grey20: '#dddddd',
        filterBg: '#333333',
        accent: '#151515',
        hoverBg: '#151515'
      }
    }
  },
  //as traduções
  locale: locale,
  dashboard: {
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
})

export const adminJSRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJS,
  {
    //usando a autentificaçao para ver se o usuário exite ou se esta correto , para fazer login
    //os dois metodos abaixo sao obrigatorios, authenticate e cookiespassword
    authenticate: async (email, password) => {
      //vai receber o email e a senha do usuário como parametro
      const user = await User.findOne({ where: { email } }) // vai ser criada a constante buscando o usuário pelo email, também sera verificado se o usuário é admin ou nao
      if (user && user.role === 'admin') {
        // se der true vai verificar usando o bcrypt , se a senha digitada é  a mesma do usuário
        const matched = await bcrypt.compare(password, user.password)

        if (matched) {
          //se for a mesma vai retornar o usuário e liberar o login
          return user
        }
        //se a senha for diferente ou nao existir o usuário vai voltar false , impedindo o login
        return false
      }
    },
    cookiePassword: 'senha-do-cookie'
  },
  null,
  {
    resave: false,
    saveUninitialized: false
  }
)
