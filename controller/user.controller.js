const User = require('../models/user')
const bcrypt = require('bcrypt')
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
            return console.log(`1Oooops... something went wrong!`)//TODO: чи потрібно передати параметр в `res`
        }
        const candidate = await User.findOne({email})
        if(candidate){
            res.json({candidate})

            return console.log(`2Oooops... something went wrong!`)//TODO: чи потрібно передати параметр в `res`
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, password: hashPassword, name})
        const token = generateJWT(user.id, email)
        return res.json({token})
    }
    async login(req, res, next){
        const {email, password} = req.body
        if(!email || !password){
            return console.log(`Oooops... something went wrong!`)//TODO: чи потрібно передати параметр в `res`
        }
        const user = await User.findOne({email})
        if(!user){
            return console.log(`Oooops... something went wrong!`)//TODO: чи потрібно передати параметр в `res`
        }
        let comparePassword = await bcrypt.compare(password, user.password)
        if(!comparePassword){
            return console.log(`Oooops... something went wrong!`)//TODO: чи потрібно передати параметр в `res`
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