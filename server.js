const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config')

const app = express()
app.use(express.json())
app.use(cors)

mongoose.connect(process.env.MONGOOSE_URI, { useNewUrlParser: true })
require('./src/models/Task')


app.use('/api', require("./src/routes"))

app.listen(3001)