import { ResourceWithOptions } from 'adminjs'
import { Category, Course, Episode, User } from '../../models'
import { CategoryResourceOptions } from './Category'
import { courseResourceFeatures, courseResourceOptions } from './Course'
import { episodeResourceFeatures, episodeResourceOptions } from './Episode'
import { userResourceOptions } from './User'

export const adminJsResources: ResourceWithOptions[] = [
  //aqui nesse array vai sendo adicionado os recursos a ser exibidos no catalogo
  {
    resource: Category,
    options: CategoryResourceOptions
  },
  {
    resource: Course,
    options: courseResourceOptions,
    features: courseResourceFeatures
  },
  {
    resource: Episode,
    options: episodeResourceOptions,
    features: episodeResourceFeatures
  },
  {
    resource: User,
    options: userResourceOptions
  }
]
