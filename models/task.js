const db= require('../db/db')

const schema = new db.Schema({
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
    order: {
        type: Number,
        // required: true
    },
    columnId:{
      type: db.Schema.Types.ObjectId,
      required: true
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
        type: db.Schema.Types.ObjectId,
         default: "000000000000000000000000"
    }
})

module.exports = db.model('Task', schema)

