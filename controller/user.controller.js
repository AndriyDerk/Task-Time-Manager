const User = require('../models/user')
const bcrypt = require('bcrypt')
const ApiError = require(`../error/api.error`)
const jwt = require('jsonwebtoken')

const generateJWT = (id, email) =>{
    return jwt.sign(
        {id, email},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class userController{
    async registration(req, res, next){
     const {email, password, name} = req.body
        if(!email || !password || !name){
            return next(ApiError.badRequest("Не введено логін, пароль або ім'я!"))
        }
        const candidate = await User.findOne({email})
        if(candidate){
            return next(ApiError.badRequest('Корситувач з таким email вже зареєстрований!'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, password: hashPassword, name})
        const token = generateJWT(user.id, email)
        return res.json({token})
    }
    async login(req, res, next){
        const {email, password} = req.body
        if(!email || !password){
            return next(ApiError.badRequest('Не введено логін або пароль!'))
        }
        const user = await User.findOne({email})
        if(!user){
            return next(ApiError.badRequest('Користувача з таким email не знайдено!'))
        }
        let comparePassword = await bcrypt.compare(password, user.password)
        if(!comparePassword){
            return next(ApiError.badRequest('Невірний пароль!'))
        }
        const token = generateJWT(user.id, email)
        return res.json({token})
    }
    async check(req, res){
        const token = generateJWT(req.user.id, req.user.email)
        return res.json({token})
    }
}

module.exports = new userController()