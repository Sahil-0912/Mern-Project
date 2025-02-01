const router = require('express').Router()

const categoryController = require('../conroller/Category.Controller')

router.post('/addcategory', categoryController.store)
router.get('/viewcategory', categoryController.index)
router.delete('/deletecat/:id', categoryController.trash)
router.put('/editcat/:id', categoryController.edit)


module.exports = router