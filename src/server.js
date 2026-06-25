import 'dotenv/config'

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import {router} from './routes/router.js'

const app = express()

const corsConfig = {
  origin: [process.env.CLIENT_URL],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}
app.use(cors(corsConfig))
app.use(express.json())
app.use(cookieParser())

app.use(router)

app.listen(process.env.PORT, () => {
  console.log('server started');
})
