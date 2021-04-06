const mongodb = require('mongoose')

const ModelCheckout = new mongodb.Schema({
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
     paymentId :{
        type: String,
        required: true
     },
     idUser: [{
        type: String,
        ref: "user"
    }]
})

const DataCheckout = mongodb.model('checkout',ModelCheckout)

module.exports = DataCheckout