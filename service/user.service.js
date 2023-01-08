const User = require('../models/user')
const bcrypt = require('bcrypt')
const ApiError = require(`../error/api.error`)
const uuid= require('uuid')
const mailService = require('./mail.service')
const tokenService = require('../service/token.service')
const UserDto = require('../dtos/user.dto')

class userService{
    async registration(email, password, name){
        const candidate = await User.findOne({email})
        if(candidate){//TODO:
            throw ApiError.badRequest('Корситувач з таким email вже зареєстрований!')
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()

        const user = await User.create({email, password: hashPassword, name, activationLink})
        await mailService.sendActivationMail(email, `${process.env.API_URL}/user/activate/${activationLink}`)

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return ({...tokens, user: userDto})
    }

    async login(email, password){
        const user = await User.findOne({email})
        if(!user){
            throw ApiError.badRequest('Користувача з таким email не знайдено!')
        }
        let comparePassword = await bcrypt.compare(password, user.password)
        if(!comparePassword){
            throw ApiError.badRequest('Невірний пароль!')
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return ({...tokens, user: userDto})
    }

    async activate(activationLink){
        const user = await User.findOne({activationLink})
        if(!user){
            throw ApiError.badRequest("Користувача не знайдено!")
        }
        user.isActivated = true
        await user.save()
    }

    async refresh(refreshToken){//TODO: перевірити + доробити сервіси
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if(!tokenFromDb || !userData){
            throw ApiError.badRequest("Користувач не авторизований!")
        }
        const id = userData.id
        const user = await User.findOne({id})
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return ({...tokens, user: userDto})
    }

    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

}
module.exports = new userService()