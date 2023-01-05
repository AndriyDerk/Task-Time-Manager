require('dotenv').config()
const express = require('express')
const router = require('./router/index')

const PORT = 5000 || process.env.PORT

const app = express()

app.use(express.json())
app.use('/', router)

async function start(){
    try{
        app.listen(PORT, ()=>{
            console.log(`server started on PORT: ${PORT}`)
        })
    }catch (e){
        console.log(e)
    }
}

start()//TODO: зробити перевірку даних на їх тип? Нормально налаштувати помилки, доробити errorHandlingMiddleware!