const express = require("express")
const mongoose = require('mongoose')
require("dotenv/config")

const app = express()
app.use(express.json())

mongoose.connect(process.env.MONGOOSE_URI, { useNewUrlParser: true })
require('./src/models/Task')


app.use('/api', require("./src/routes"))

app.listen(3001)