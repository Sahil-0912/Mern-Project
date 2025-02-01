const router = require('express').Router()

const ProductController = require('../conroller/Product.Controller')
const upload = require('../middleware/upload.file')

router.post('/', upload.single('product_img'), ProductController.store)
router.get('/', ProductController.index)


module.exports = router