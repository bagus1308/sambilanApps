const express = require('express')
const router = express.Router()
const categoryController = require('../Controller/categoryController')

router.route('/')
    .post(categoryController.insertCategory)
    .get(categoryController.getCategory)

router.route('/:id')
    .get(categoryController.getCategoryByID)
    .patch(categoryController.updateCategory)
    .delete(categoryController.deleteCategory)

module.exports =router