const mongodb = require('mongoose')

const ModelProfile = new mongodb.Schema({
    name: {
        type: String,
        required: true
    },
    profession: {
        type: String,
        required: true
    },
    categoryId: [{
        type: ObjectId,
        ref: "category"
    }],
    Phone: {
        type: Number,
        required: true
    },
    Address: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    }
})

const DataProfile = mongodb.model('profile',ModelProfile)

module.exports = DataProfile