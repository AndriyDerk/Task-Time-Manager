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
    },
    hashtags: {
        type: [[String]]
    },
    membersId: {
        type: [String]//TODO: does it work?
    },
    adminsId: {
        type: [String],//TODO: does it work?
        required: true
    }
})

module.exports =db.model('Project', schema)