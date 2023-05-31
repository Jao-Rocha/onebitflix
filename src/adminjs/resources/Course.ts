import uploadFileFeature from '@adminjs/upload'
import { FeatureType, ResourceOptions } from 'adminjs'
import path from 'path'

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
//construindo a possibilidade de upload
export const courseResourceFeatures: FeatureType[] = [
  uploadFileFeature({
    provider: {
      local: {
        //local onde ficará armazenado  o upload
        bucket: path.join(__dirname, '..', '..', '..', 'public')
      }
    },
    properties: {
      //key é a coluna do banco que o upload  vai pertencer
      key: 'thumbnailUrl',
      file: 'uploadThumbnail'
    },
    uploadPath: (record, filename) =>
      `thumbnails/course-${record.get('id')}/${filename}`
  })
]
