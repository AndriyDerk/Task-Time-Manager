const db= require('../db/db')

const schema = new db.Schema({
    title: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: "#00ffff"
    },
    taskId: {
        type: db.Schema.Types.ObjectId,
        required: true
    }
})

module.exports = db.model('Tag', schema)