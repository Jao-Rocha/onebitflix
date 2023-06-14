import express from 'express'
import { sequelize } from './database'
import { adminJS, adminJSRouter } from './adminjs'
import { router } from './routes'

const app = express()

//app.use(caminho, rotas)
app.use(express.static('public'))
app.use(adminJS.options.rootPath, adminJSRouter)
app.use(router)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  sequelize.authenticate().then(() => {
    console.log('DB connection successfuly')
  })
  console.log(`Server started successsfuly at port ${PORT}`)
})
