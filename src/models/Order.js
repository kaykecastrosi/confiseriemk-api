const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    profileID: {
        type: String,
        required: true
    },

    isActive: {
        type: Boolean,
        required: true
    },

    items: {
        type: Array,
        required: true
    },

    price: {
        type: String,
        required: true
    },

    itemsPrice: {
        type: String,
        required: true
    },

    shippingPrice: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true
    },

    paymentMethod: {
        type: String,
        required: true
    },

    paymentID: {
        type: String,
        required: true
    }
})

mongoose.model('Order', OrderSchema)