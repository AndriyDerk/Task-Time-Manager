const db= require('../db/db')

const schema = new db.Schema({
    userId:{
        type: db.Schema.Types.ObjectId
    },
    refreshToken:{
        type: String,
        required: true
    }
})

module.exports = db.model('Token', schema)

//TODO: ref - посилання в монго, гугел:3 + переробити з стрінга в обжектід