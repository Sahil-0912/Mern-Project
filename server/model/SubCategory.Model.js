const { Schema } = require("mongoose")
const { model } = require("mongoose")

const SubCatschema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: "category"
    },
    sub_cat: {
        type: String
    }
})

const SubCat = model('subcat', SubCatschema)
module.exports = SubCat