const { Schema, model } = require("mongoose");

const catschema = new Schema({
    cat_name: {
        type: String,
        required: true,
        trim: true
    }
})

const Category = model('category', catschema)
module.exports = Category