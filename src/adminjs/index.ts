import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import AdminJSSequelize from '@adminjs/sequelize'
import { sequelize } from '../database'
import { adminJsResources } from './resources'
import { User } from '../models'
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
  locale: locale
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
