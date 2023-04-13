import { Optional, Model, DataTypes } from 'sequelize'
import { sequelize } from '../database'

export interface Course {
  id: number
  name: string
  synopsis: string
  thumbnailUrl: string
  featured: boolean
  categoryId: number
}

export interface CourseCreationAttributes
  extends Optional<Course, 'id' | 'thumbnailUrl' | 'featured'> {}

export interface CourseInstance
  extends Model<Course, CourseCreationAttributes>,
    Course {}

//para definir a tabela usamos o define() o primeiro parametro é o nome da tabela, e o segundo é a propriedade de todas as colunas, lembrando que foi passado o tipos genéricos no define para ser usada a tipagem do typescript que foi criada nas  interfaces acima
export const Course = sequelize.define<CourseInstance, Course>('Course', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  synopsis: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  thumbnailUrl: {
    type: DataTypes.STRING
  },
  featured: {
    defaultValue: false,
    type: DataTypes.BOOLEAN
  },
  categoryId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    //realação entre as tabelas
    references: { model: 'categories', key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
  }
})
