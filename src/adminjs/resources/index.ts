import { ResourceWithOptions } from 'adminjs'
import { Category, Course } from '../../models'
import { CategoryResourceOptions } from './Category'
import { courseResourceOptions } from './Course'

export const adminJsResources: ResourceWithOptions[] = [
  {
    resource: Category,
    options: CategoryResourceOptions
  },
  {
    resource: Course,
    options: courseResourceOptions
  }
]
