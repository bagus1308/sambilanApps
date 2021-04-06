const express = require('express')
const router = express.Router()
const profileController = require('../Controller/profileController')

router.route('/')
    .post(profileController.insertProfile)
    .get(profileController.getProfile)

router.route('/:id')
    .get(profileController.getProfileByID)
    .patch(profileController.updateProfile)
    .delete(profileController.deleteProfile)

module.exports =router