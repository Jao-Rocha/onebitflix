import uploadFileFeature from '@adminjs/upload'
import { FeatureType, ResourceOptions } from 'adminjs'
import path from 'path'

//configs do admin js para exibir la no catalogo
export const episodeResourceOptions: ResourceOptions = {
  navigation: 'Catálogo',
  editProperties: [
    'name',
    'synopsis',
    'courseId',
    'order',
    'uploadVideo',
    'secondsLong'
  ],
  filterProperties: [
    'name',
    'synopsis',
    'courseId',
    'secondsLong',
    'createdAt',
    'updatedAt'
  ],
  listProperties: ['id', 'name', 'courseId', 'order', 'secondsLong'],
  showProperties: [
    'id',
    'name',
    'synopsis',
    'courseId',
    'order',
    'videoUrl',
    'secondsLong',
    'createdAt',
    'updatedAt'
  ]
}
//uploads dos videos
export const episodeResourceFeatures: FeatureType[] = [
  uploadFileFeature({
    provider: {
      local: {
        bucket: path.join(__dirname, '..', '..', '..', 'uploads')
      }
    },
    properties: {
      key: 'videoUrl',
      file: 'uploadVideo'
    },
    uploadPath: (record, filename) =>
      `videos/course-${record.get('courseId')}/${filename}`
  })
]
