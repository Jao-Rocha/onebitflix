import { ResourceOptions } from 'adminjs'

//aqui esta sendo passada as configs do adminjs
export const courseResourceOptions: ResourceOptions = {
  navigation: 'Catálogo',
  editProperties: [
    'name',
    'synopsis',
    'uploadThumbnail',
    'featured',
    'categoryId'
  ],
  filterProperties: [
    'name',
    'synopsis',
    'featured',
    'categoryId',
    'createdAt',
    'updatedAt'
  ],
  listProperties: ['id', 'name', 'featured', 'categoryId'],
  showProperties: [
    'id',
    'name',
    'synopsis',
    'featured',
    'thumbnailUrl',
    'categoryId',
    'createdAt',
    'updatedAt'
  ]
}
