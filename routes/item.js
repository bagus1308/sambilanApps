const express = require('express')
const router = express.Router()
const itemController = require('../Controller/itemController')

router.route('/')
    .post(itemController.insertItem)
    .get(itemController.getItem)

router.route('/:id')
    .get(itemController.getItemByID)
    .patch(itemController.updateItem)
    .delete(itemController.deleteItem)

module.exports =router