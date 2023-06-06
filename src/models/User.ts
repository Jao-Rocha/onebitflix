import { sequelize } from '../database'
import { DataTypes, Model, Optional } from 'sequelize'
import bcrypt from 'bcrypt'

export interface User {
  id: number
  firstName: string
  lastName: string
  phone: string
  birth: Date
  email: string
  password: string
  role: 'admin' | 'user'
}

export interface UserCreationAttributes extends Optional<User, 'id'> {}

export interface UserInstance
  extends Model<User, UserCreationAttributes>,
    User {}

export const User = sequelize.define<UserInstance, User>(
  'users',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING
    },
    birth: {
      allowNull: false,
      type: DataTypes.DATE
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isIn: [['admin', 'user']]
      }
    }
  },
  {
    //terceiro parametro opcional para a funcao define , o primeiro é o nome da tabela , o segundo é os dados da tabela e o teceiro sao os hooks que podem fazer algo com determinado dado recebido , no caso sera cryptografada a senha do usuário
    hooks: {
      beforeSave: async user => {
        // isNewRecord é do sequelize que retorna verdadeiro se ainda n estiver salva no banco de dados
        //changed verifica se a propriedade mudou de valor
        if (user.isNewRecord || user.changed('password')) {
          user.password = await bcrypt.hash(user.password.toString(), 10)
        }
      }
    }
  }
)
