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

app.get("/.well-known/pki-validation/9414B2E6F625F0D7142EF4462E817DD1.txt", function(req, res) {
    const file = `${__dirname}/src/SSL/9414B2E6F625F0D7142EF4462E817DD1.txt`
    res.download(file)
})
app.use('/api', require("./src/routes"))

app.listen(process.env.PORT)