const express = require("express")
const routes = express.Router()

const Controller = require('./controllers/Controller')

routes.get("/distancia", Controller.index )

module.exports = routes