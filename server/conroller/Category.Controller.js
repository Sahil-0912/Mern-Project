const Category = require("../model/Category.Model")

exports.store = async (req, res) => {
    try {
        const { cat_name } = req.body
        const category = await Category.create({ cat_name })
        res.json({
            message: "Category created successfully",
        })

    } catch (error) {
        console.log(error);
    }
}


exports.index = async (req, res) => {
    const category = await Category.find();
    res.json({
        success: true,
        category
    })
}

exports.trash = async (req, res) => {
    try {
        const { id } = req.params
        await Product.findByIdAndDelete(id)
        // res.json("deleted...")
        res.redirect('/ViewProduct')
    } catch (error) {
        console.log(error);
    }
}

exports.edit = async (req, res) => {
    try {
        const { id } = req.params
        const { cat_name } = req.body

        await Product.findByIdAndUpdate(
            {
                _id: id
            },
            {
                cat_name
            })
        // res.json("updated....")
        res.redirect('/ViewProduct')
    } catch (error) {
        console.log(error);
    }
}