const Category = require("../model/Category.Model");
const SubCat = require("../model/SubCategory.Model");

exports.store = async (req, res) => {
    console.log(req.body);
    try {
        const { category, sub_cat } = req.body
        await SubCat.create({ category, sub_cat })
        res.json({
            success: true,
            message: "inserted",
        })
        // res.redirect('/ViewSubCategory')
    } catch (error) {
        console.log(error);
    }
}


exports.index = async (req, res) => {
    const Subcategory = await SubCat.find().populate('category')
    res.json({
        success: true,
        Subcategory
    })
}


exports.trash = async (req, res) => {
    const { id } = req.params
try {
    await SubCat.findByIdAndDelete(id)
    // res.json("deleted.........")
} catch (error) {
    res.json(error)
}
}


exports.edit = async (req, res) => {
    const { cat_name,sub_cat } = req.body
    try {
        const { id } = req.params
        await Category.findByIdAndUpdate(
            {
                _id: id
            },
            {
                cat_name,sub_cat
            }
        )
        res.json("updated.........")
    } catch (error) {
        console.log(error);
    }
}
