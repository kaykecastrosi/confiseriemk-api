const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    flavors: {
        type: Object,
        required: true
    }
})

mongoose.model('Product', ProductSchema)