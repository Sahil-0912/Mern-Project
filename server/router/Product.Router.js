const router = require('express').Router()
const ProductController = require('../controller/Product.Controller')
const upload = require('../middleware/upload.file')

router.post('/', ProductController.store)
router.get('/', ProductController.index)
router.delete('/:id', ProductController.trash)
router.put('/:id', ProductController.edit)
module.exports = router