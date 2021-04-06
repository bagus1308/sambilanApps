const mongodb = require('mongoose')

const ModelCate = new mongodb.Schema({
    type : {
        type: String,
        required: true,
    },
    photo : {
        type: Array
    }
})

const DateCategory = mongodb.model('category',ModelCate)

module.exports = DateCategory