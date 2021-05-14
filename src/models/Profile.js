const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: false
    },
    adresses: {
        type: Array,
        required: true
    },
    previouslyOrders: {
        type: Array,
        required: false
    },
    activeOrders: {
        type: Array,
        required: false
    },
    cart: {
        type: Array,
        required: false
    }
})

mongoose.model('Profile', ProfileSchema)