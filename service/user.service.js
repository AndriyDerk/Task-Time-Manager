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
        if(candidate){
            throw ApiError.preconditionFailed('Корситувач з таким email вже зареєстрований!')
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()

        const user = await User.create({email, password: hashPassword, name, activationLink})
        await mailService.sendActivationMail(email, `${process.env.API_URL}/user/activate/${activationLink}`)

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return ({accessToken: tokens.accessToken, user: userDto})
    }

    async login(email, password){
        const user = await User.findOne({email})
        if(!user){
            throw ApiError.notFound('Користувача з таким email не знайдено!')
        }
        let comparePassword = await bcrypt.compare(password, user.password)
        if(!comparePassword){
            throw ApiError.badRequest('Невірний пароль!')
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return ({accessToken: tokens.accessToken, user: userDto})
    }

    async activate(activationLink){
        const user = await User.findOne({activationLink})
        if(!user){
            throw ApiError.notFound("Користувача не знайдено!")
        }
        user.isActivated = true
        await user.save()
    }

    async refresh(refreshToken){
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if(!tokenFromDb || !userData){
            throw ApiError.unauthorized("Користувач не авторизований!")
        }
        const id = userData.id
        const user = await User.findOne({id})
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return ({accessToken: tokens.accessToken, user: userDto})
    }

    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async rename(userId, name){
        const user = await User.findById(userId)
        if(!user){
            throw ApiError.notFound('user з таким userId не знайдено!')
        }
        user.name = name
        user.save()

        return user
    }

    async changeEmail(userId, newEmail){
        const user = await User.findById(userId)
        if(!user){
            throw ApiError.notFound('user з таким userId не знайдено!')
        }
        user.email = newEmail
        user.isActivated = false
        const activationLink = uuid.v4()
        user.activationLink = activationLink
        await mailService.sendActivationMail(newEmail, `${process.env.API_URL}/user/activate/${activationLink}`)
        user.save()

        return user
    }

    async validPassword(userId, oldPassword){
        const user = await User.findById(userId)
        if(!user){
            throw ApiError.notFound('user з таким userId не знайдено!')
        }
        let comparePassword = await bcrypt.compare(oldPassword, user.password)
        if(!comparePassword){
            throw ApiError.badRequest('Невірний пароль!')
        }

        return true//TODO: mb return user?
    }

    async changePassword(userId, newPassword){
        const user = await User.findById(userId)
        if(!user){
            throw ApiError.notFound('user з таким userId не знайдено!')
        }
        const hashPassword = await bcrypt.hash(newPassword, 3)
        user.password = hashPassword
        user.save()

        return user
    }

}
module.exports = new userService()