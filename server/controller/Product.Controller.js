const Product = require("../model/Product.Model");

exports.store = async (req, res) => {
    console.log(req.body);

    const { category, sub_cat, product_name, product_price, product_quan, product_desc, product_cat, product_img } = req.body
    try {
        if (category == "" || sub_cat == " " || product_name == "" || product_price == "" || product_quan == "" || product_desc == "" || product_cat == "") {
            res.json("all fields are required")
        } else {
            console.log(req?.file?.filename)
            const product = await Product.create({
                product_name, product_price, product_quan, product_desc, category, sub_cat,
                product_img
            })
            if (product) {
                res.json("inserted")
            }
        }
    } catch (error) {
        console.log(error)
    }
}


exports.index = async (req, res) => {
    try {
        const product = await Product.find().populate('category').populate('sub_cat')
        res.json({
            success: true,
            product
        })
    } catch (error) {
        console.log(error);
    }

}

exports.trash = async (req, res) => {
    const { id } = req.params

    try {
        await Product.findByIdAndDelete(id)
        // res.json("deleted.........")
    } catch (error) {
        res.json(error)
    }
}

exports.edit = async (req, res) => {
    const { id } = req.params
    console.log(id)
    try {
        const { category, sub_cat, product_name, product_price, product_quan, product_desc } = req.body
        var image = ''
        if (req.file) {
            image = req.file.filename
        } else {
            image = req.body.product_img
        }
        await Product.findByIdAndUpdate(
            {
                _id: id
            },
            {
                category, sub_cat, product_name, product_price, product_quan, product_desc,  product_img: image

            })
        res.json("updated....")
        // res.redirect('/ViewBlog')
    } catch (error) {
        console.log(error);
    }

}