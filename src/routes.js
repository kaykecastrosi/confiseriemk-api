const express = require("express")
const routes = express.Router()

const Controller = require('./controllers/Controller')

//Frete
routes.get("/shipping", Controller.shipping )
routes.get("address", Controller.address)

//Seção de Contas
routes.get("/profiles", Controller.allProfiles )
routes.get("/profiles/:id", Controller.profileByID )
routes.post('/profiles', Controller.createProfile )
routes.put('/profiles/:id', Controller.updateProfile )
routes.delete('/profiles/:id', Controller.removeProfile )

//Login
routes.get("/login", Controller.login)

//Seção de Pedidos
routes.get("/orders", Controller.allOrders )
routes.get("/orders/:id", Controller.orderByID )
routes.post('/orders', Controller.createOrder )
routes.put('/orders/:id', Controller.updateOrder )
routes.delete('/orders/:id', Controller.removeOrder )

module.exports = routes