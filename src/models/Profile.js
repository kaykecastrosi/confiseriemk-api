const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
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