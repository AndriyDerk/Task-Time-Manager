const db= require('../db/db')

const schema = new db.Schema({
    projectId: {
        type: db.Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: db.Schema.Types.ObjectId,
        required: true
    },
    admin: {
       type: Boolean,
       default: false
    }
})

module.exports = db.model('UserProject', schema)