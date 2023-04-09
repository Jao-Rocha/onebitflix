import { ResourceWithOptions } from 'adminjs'
import { Category } from '../../models'
import { CategoryResourceOptions } from './Category'

export const adminJsResources: ResourceWithOptions[] = [
  {
    resource: Category,
    options: CategoryResourceOptions
  }
]
