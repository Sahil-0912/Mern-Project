const Product = require("../model/Product.Model")

exports.store = async (req, res) => {
    const { product_name, product_price, product_quan, product_desc,product_cat } = req.body
    try {
        if (product_name == "" || product_price == "" || product_quan == " " || product_desc == "" ||  product_cat == " ") {
            res.json("all fields are required")
        } else {
            // console.log(req.file.filename)
            const product = await Product.create({
                product_name,
                product_price,
                product_quan,
                product_desc,
                product_cat,
                product_img: req.file.filename
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
    const product = await Product.find();
    res.json({
        success: true,
        product
    })
}
