const db= require('../db/db')

const schema = new db.Schema({//TODO : add status[String], started[Number], order[Number]
    projectId:{
        type: String,//TODO: does it work?
        required: true
    },
    title:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        trim: true,
        default: ""
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
        default: new Date("9999-01-01")
    },
    workingNow:{
        type: Boolean,
         default: false
    },
    underTaskId: {
        type: String,//TODO: does it work?,
        default: "0"//TODO: 0 || exist id
    }
})

module.exports = db.model('Task', schema)

