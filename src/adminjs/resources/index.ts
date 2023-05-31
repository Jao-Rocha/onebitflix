import { ResourceWithOptions } from 'adminjs'
import { Category, Course, Episode } from '../../models'
import { CategoryResourceOptions } from './Category'
import { courseResourceOptions } from './Course'
import { episodeResourceFeatures, episodeResourceOptions } from './Episode'

export const adminJsResources: ResourceWithOptions[] = [
  //aqui nesse array vai sendo adicionado os recursos a ser exibidos no catalogo
  {
    resource: Category,
    options: CategoryResourceOptions
  },
  {
    resource: Course,
    options: courseResourceOptions
  },
  {
    resource: Episode,
    options: episodeResourceOptions,
    features: episodeResourceFeatures
  }
]
