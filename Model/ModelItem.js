const mongodb = require('mongoose')

const ModelItem = new mongodb.Schema({
    itemId: [{
        type: String,
        ref: "item"
    }],
    profileId: [{
        type: String,
        ref: "profile"
    }],
    
    categoryId: [{
        type: String,
        ref: "category"
    }],
    Description: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    }
    
})

const DataItem = mongodb.model('item',ModelItem)

module.exports = DataItem