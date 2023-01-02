const db= require('../db/db')

const schema = new db.Schema({//TODO : add status[String], started[Number], order[Number]
    projectId:{
        type: Number,//TODO: does it work?
        required: true
    },
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
    createdAt: {
        type: Date,
        default: Date.now()
    },
    spendTime: {
        type : Number,
        default: 0
    },
    deadline: {
        type: Date,
        required: true
    },
    workingNow:{
        type: Boolean,
         default: false
    },
    underTaskId: {
        type: Number,//TODO: does it work?,
        required: true//TODO: 0 || exist id
    }
})

module.exports =db.model('Task', schema)

