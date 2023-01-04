const db= require('../db/db')

const schema = new db.Schema({
    projectId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    admin: {
       type: Boolean,
       default: false
    }
})

module.exports = db.model('UserProject', schema)