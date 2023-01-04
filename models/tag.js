const db= require('../db/db')

const schema = new db.Schema({
    title: {
        type: String,
        required: true
    },
    color: {
        type: String,
    },
    taskId: {
        type: String,
        required: true
    }
})

module.exports = db.model('Tag', schema)