const express = require("express")
const cors = require('cors')
const mongoose = require('mongoose')
require("dotenv/config")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGOOSE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
require('./src/models/Profile')
require('./src/models/Order')
require('./src/models/Product')
app.use('/api', require("./src/routes"))

app.listen(process.env.PORT)