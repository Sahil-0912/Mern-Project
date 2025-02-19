const router = require('express').Router()
const CategoryController = require('../controller/Category.Controller')

router.post('/', CategoryController.store)
router.get('/', CategoryController.index)
router.delete('/:id', CategoryController.trash)
router.put('/:id', CategoryController.edit)
module.exports = router