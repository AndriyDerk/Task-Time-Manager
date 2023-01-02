const db= require('../db/db')

const schema = new db.Schema({
    email:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    name:{
        type: String,
        required: true,
        trim: true
    }
})

module.exports =db.model('User', schema)