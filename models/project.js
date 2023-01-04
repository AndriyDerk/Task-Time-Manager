const db= require('../db/db')

const schema = new db.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        trim: true
    }
})

module.exports = db.model('Project', schema)