const {Client} = require("@googlemaps/google-maps-services-js");
const client = new Client({})
const buscaCep = require('busca-cep');
const mongoose = require('mongoose')
require("dotenv/config")

const Profile = mongoose.model('Profile')
const Order = mongoose.model('Order')

require("dotenv/config")

module.exports = {
    async shipping(req, res) {
        //Função para converter CEP e número em endereço completo
        async function address() {
            let address;
            await buscaCep(req.query.cep, {sync: false, timeout: 1000}).then(json => address = json.logradouro + " " + req.query.number + ' ' + json.bairro +  " " + json.localidade + " " +  json.uf )
            return address
        }

        async function getAddress() {
            let address;
            await buscaCep(req.query.cep, {sync: false, timeout: 1000}).then(r => address = r)
            return address;
        }
        var addressData = await getAddress()
        //Armazena o endereço completo em uma variável
        var address = await address()
        //Função para calcular a distância do endereço de entrega
        async function distanceCalculation() {
            let distance;
             await client.distancematrix({
                params: {
                    key: process.env.GOOGLE_CLOUD_KEY,
                    origins: ["Rua+Gilberto+Porto+1113+Nova+Gameleira+Belo+Horizonte"],
                    destinations: [address],
                    mode: "driving"
                },
                timeout: 1000,
            }).then(r => distance = r.data.rows[0].elements[0].distance.text)
            return distance
        }
        //Armazena a distância em uma variável
        var distance = await distanceCalculation()
        //Converte a distância em apenas número
        var finalDistance = distance.replace(" km", "")
        //Função para calcular o preço do frete
        function priceCalculation(){
            var price
            if(finalDistance > 3){
                price = 10.50 + ((finalDistance - 3) * 1.20) + 0.75
            } else {
                price = 10.50 + 0.75
            }
            return price
        }
        //Armazena o preço em uma variável
        var price = priceCalculation()
        //Converte o preço em no máximo duas casas decimais
        var finalPrice = price.toFixed(2)
        //Confere se o endereço está dentro da área de entrega
        if(finalDistance > 7.917){
            return res.json({ status: 'error', message: 'Infelizmente, este endereço ainda está fora da nossa área de envio.' })
        } else {
            return res.json({ status: 'ok', distance: finalDistance, price: finalPrice, data: addressData })
        }
       
    },
    //Seção de Contas
    async cart(req, res) {

    },

    async allProfiles(req, res) {
        if(req.query.key == process.env.HASH){
        const profile = await Profile.find()

        return res.json(profile)
        } else {
            return res.json({"error": "Authorization failed"})
        }
        
    },

    async profileByID(req, res) {
        if(req.query.key == process.env.HASH){
        const profile = await Profile.findById(req.params.id)

        return res.json(profile)
        } else {
            return res.json({"error": "Authorization failed"})
        }
        
    },

    async login(req, res) {
        if(req.query.key == process.env.HASH){
        const profile = await Profile.findOne({ email: req.query.email, password: req.query.password }, '_id')
        return res.json(profile)
        } else {
            return res.json({"error": "Authorization failed"})
        }
        
    },


    async createProfile(req, res) {
        if(req.query.key == process.env.HASH){
        const profile = await Profile.create(req.body)
        return res.json(profile)
        } else {
            return res.json({"error": "Authorization failed"})
        }
    },

    async updateProfile(req, res) {
        if(req.query.key == process.env.HASH){
        const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true })

        return res.json(profile)
        } else {
            return res.json({"error": "Authorization failed"})
        }
    },

    async removeProfile(req, res) {
        if(req.query.key == process.env.HASH){
        const profile = await Profile.findByIdAndRemove(req.params.id)

        return res.send()
        } else {
            return res.json({"error": "Authorization failed"})
        }
    },

    //Seção de Pedidos
    async createOrder(req, res) {
        if(req.query.key == process.env.HASH){
        const order = await Order.create(req.body)
        return res.json(order)
        } else {
            return res.json({"error": "Authorization failed"})
        }
    },

    async removeOrder(req, res) {
        if(req.query.key == process.env.HASH){
        const order = await Order.findByIdAndRemove(req.params.id)

        return res.send()
        } else {
            return res.json({"error": "Authorization failed"})
        }
    },

    async allOrders(req, res) {
        if(req.query.key == process.env.HASH){
        const orders = await Order.find()

        return res.json(orders)
        } else {
            return res.json({"error": "Authorization failed"})
        }
        
    },

    async orderByID(req, res) {
        if(req.query.key == process.env.HASH){
        const order = await Order.findById(req.params.id)

        return res.json(order)
        } else {
            return res.json({"error": "Authorization failed"})
        }
        
    },

    async updateOrder(req, res) {
        if(req.query.key == process.env.HASH){
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true })

        return res.json(order)
        } else {
            return res.json({"error": "Authorization failed"})
        }
    },
}