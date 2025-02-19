const { Schema, model } = require("mongoose");

const productschema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    sub_cat: {
        type: Schema.Types.ObjectId,
        ref: 'subcat'
    },
    product_name: {
        type: String,
        required: true,
        trim: true
    },
    product_price: {
        type: String,
        required: true,
        trim: true
    },
    product_quan: {
        type: String,
        required: true,
        trim: true
    },
    product_desc: {
        type: String,
        required: true,
        trim: true
    },
    product_img: {
        type: String
    }
})

const Product = model('product', productschema)
module.exports = Product