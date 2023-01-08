const db= require('../db/db')

const schema = new db.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    projectId:{
        type: db.Schema.Types.ObjectId,
        required: true
    }
})

module.exports = db.model('Column', schema)