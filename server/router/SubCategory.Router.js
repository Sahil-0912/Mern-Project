const router = require('express').Router()
const SubCategoryController = require('../controller/SubCategory.Controller')

router.post('/', SubCategoryController.store)
router.get('/', SubCategoryController.index)
router.delete('/:id', SubCategoryController.trash)
router.put('/:id', SubCategoryController.edit)
module.exports = router