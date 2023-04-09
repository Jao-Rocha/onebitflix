import { Model, Optional, DataTypes } from 'sequelize'
import { sequelize } from '../database'

//vai informar o formato do objeto
export interface Category {
  id: number
  name: string
  position: number
}

//queremos qu na hora da criação da categoria o ID seja opcional , pq  esse id sera gerado pelo banco
export interface CategoryCreationAttributes extends Optional<Category, 'id'> {}

//a CategoryInstance é uma mistura do model do sequelize , com os atributos de categoria da nossa tabela
export interface CategoryInstance
  extends Model<Category, CategoryCreationAttributes>,
    Category {}

export const Category = sequelize.define<CategoryInstance, Category>(
  'Category',
  {
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
    position: {
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER
    }
  }
)
