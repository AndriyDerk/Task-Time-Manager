require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const router = require('./router/index')
const errorMiddleware = require('./middleware/errorHandlingMiddleware')
const ApiError = require('./error/api.error')

const PORT = 5000 || process.env.PORT

const app = express()

app.use(express.json())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use(cookieParser())
app.use('/', router)
app.use(errorMiddleware)

async function start(){
    try{
        app.listen(PORT, ()=>{
            console.log(`server started on PORT: ${PORT}`)
        })
    }catch (e){
        throw  ApiError.internal('Непередбачувана помилка!')
    }
}

start()//TODO: зробити перевірку даних на їх тип?