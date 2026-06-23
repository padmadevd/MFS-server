const dotenv = require('dotenv')
const cors = require('cors')
const express = require('express')

dotenv.config()

const app = express()

const corsConfig = {
  origin: [process.env.CLIENT_URL],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}
app.use(cors(corsConfig))

app.use(express.json())
