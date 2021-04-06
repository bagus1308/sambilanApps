const mongodb = require('mongoose')

const ModelUser = new mongodb.Schema({
    name :{
        type: String,
        required: true
     },
     email :{ 
        type: String,
        required: true
     },
     password:{
         type: String,
        required: true
     },
     address :{
        type: String,
        required: true
     },
     location: {
        type: String,
        required: true
     }
})

const DataUser = mongodb.model('user',ModelUser)

module.exports = DataUser