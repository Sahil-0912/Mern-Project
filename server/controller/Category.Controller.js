const Category = require("../model/Category.Model");

exports.store = async (req, res) => {
    console.log(req.body);
    const { cat_name } = req.body
    try {
        const category = await Category.create({ cat_name })
        res.json("inserted....")
    } catch (error) {
        console.log(error);
    }
}


exports.index = async (req, res) => {
    try {
        const category = await Category.find()
        res.json({
            category
        })
    } catch (error) {
        console.log(error);
    }

}

exports.trash = async (req, res) => {

    const { id } = req.params
    console.log(id)
    try {
        await Category.findByIdAndDelete(id)
    } catch (error) {
        res.json(error)
    }
}

exports.edit = async (req, res) => {
    const { cat_name } = req.body
    try {
        const { id } = req.params
        await Category.findByIdAndUpdate(
            {
                _id: id
            },
            {
                cat_name
            }
        )
        res.json("updated.........")
    } catch (error) {
        console.log(error);
    }
}