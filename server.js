const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
require("dotenv/config")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGOOSE_URI, { useNewUrlParser: true })
require('./src/models/Profile')


app.use('/api', require("./src/routes"))

app.listen(3001)