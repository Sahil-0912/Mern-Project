const { Schema, model } = require("mongoose");


const productschema = new Schema({
    product_name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    product_price: {
        type: Number,
        required: true,
    },
    product_quan: {
        type: Number,
        required: true,
    },
    product_desc: {
        type: String,
        required: true,
    },
    product_cat: {
        type: String,
        required: true,
    },
    product_img: {
        type: String
    }
}, {
    timestamps: true
})

const Product = model('product', productschema)
module.exports = Product