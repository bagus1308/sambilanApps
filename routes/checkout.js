const express = require('express')
const router = express.Router()
const checkoutController = require('../Controller/checkoutController')

router.route('/')
    .post(checkoutController.insertCheckout)
    .get(checkoutController.getCheckout)

router.route('/:id')
    .get(checkoutController.getCheckoutByID)
    .patch(checkoutController.updateCheckout)
    .delete(checkoutController.deleteCheckout)

module.exports =router