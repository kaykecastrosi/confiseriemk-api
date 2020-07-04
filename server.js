const express = require("express")
const mongoose = require('mongoose')

const app = express()

mongoose.connect('mongodb+srv://admin:90152004@cluster0.3tkhw.mongodb.net/tasks?retryWrites=true&w=majority', { useNewUrlParser: true })
require('./src/models/Task')


app.use('/api', require("./src/routes"))

app.listen(3001)