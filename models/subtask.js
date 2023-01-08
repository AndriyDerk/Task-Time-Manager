const db= require('../db/db')

const schema = new db.Schema({
    description:{
        type: String,
        required: true,
        trim: true
    },
    taskId: {
        type: db.Schema.Types.ObjectId,
        required: true
    },
    isDone: {
        type: Boolean,
        default: false
    }
})

module.exports = db.model('Subtask', schema)