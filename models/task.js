const db= require('../db/db')

const schema = new db.Schema({//TODO : add status[String], started[Number], order[Number]
    projectId:{
        type: db.Schema.Types.ObjectId,
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
    }
})

module.exports = db.model('Task', schema)

