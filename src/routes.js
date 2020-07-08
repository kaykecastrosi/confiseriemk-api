const express = require("express")
const routes = express.Router()

const ProfileController = require('./controllers/ProfileController')

routes.get("/profiles", ProfileController.index )
routes.get("/profiles/:id", ProfileController.show )
routes.post('/profiles', ProfileController.store )
routes.put('/profiles/:id', ProfileController.update )
routes.delete('/profiles/:id', ProfileController.destroy)

module.exports = routes