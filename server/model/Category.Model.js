const { Schema, model } = require("mongoose");


const categryschema = new Schema({
    cat_name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

}, {
    timestamps: true
})

const Category = model('category', categryschema)
module.exports = Category