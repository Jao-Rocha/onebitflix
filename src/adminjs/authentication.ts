import { AuthenticationOptions } from '@adminjs/express'
import { User } from '../models'
import bcrypt from 'bcrypt'

export const authenticationOptions: AuthenticationOptions = {
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
}
