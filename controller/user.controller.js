const ApiError = require(`../error/api.error`)
const userService = require('../service/user.service')

class userController{
    async registration(req, res, next){
        try{
            const {email, password, name} = req.body
            if(!email || !password || !name){
                return next(ApiError.badRequest("Не введено логін, пароль або ім'я!"))
            }
            const userData = await userService.registration(email, password, name)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.json(userData)
        }catch (e) {
            next(e)
        }
    }
    async login(req, res, next){
        try {
            const {email, password} = req.body
            if(!email || !password){
                return next(ApiError.badRequest('Не введено логін або пароль!'))
            }
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.json({accessToken: userData.accessToken, user: userData.user})
        }catch (e){
            next(e)
        }
    }
    async refresh(req, res, next){
        try {
            const {refreshToken} = req.cookies
            if(!refreshToken){
                return next(ApiError.badRequest('Користувач не авторизований!'))
            }
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.json({accessToken: userData.accessToken, user: userData.user})
        }catch (e) {
            next(e)
        }
    }
    async activate(req, res, next){
        try {
            const activationLink = req.params.link
            await userService.activate(activationLink)

            return res.redirect(process.env.CLIENT_URL)
        }catch (e){
            next(e)
        }
    }

    async logout(req, res, next){
        try{
            const {refreshToken} = req.cookies
            const token = userService.logout(refreshToken)
            res.clearCookie('refreshToken')

            return res.json(token)
        }catch (e) {
            next(e)
        }
    }

    async rename(req, res ,next){
        try{
            const {userId, name} = req.body
            if(!userId || !name){
                return next(ApiError.badRequest('Не введено name або userId!'))
            }
            const user = await userService.rename(userId, name)

            return res.json(user)
        }catch (e){
            next(e)
        }
    }

    async changeEmail(req, res, next){
        try {
            const {userId, newEmail} = req.body
            if(!userId || !newEmail){
                return next(ApiError.badRequest('Не введено newEmail або userId!'))
            }
            const user = await userService.changeEmail(userId, newEmail)

            return res.json(user)
        }catch (e) {
            next(e)
        }
    }

    async validPassword(req, res, next){//oldPassword -> validPassword: if ok then newPassword -> changePassword to change this one(or changeEmail)
        try{
            const {userId, oldPassword}  = req.body
            if(!userId || !oldPassword){
                return next(ApiError.badRequest('Не введено oldPassword або userId!'))
            }
            const isCorrect = await userService.validPassword(userId, oldPassword)

            return res.json({isCorrect: isCorrect})
        }catch (e){
            next(e)
        }
    }

    async changePassword(req, res, next){
        try{
            const {userId, newPassword} = req.body
            if(!userId || !newPassword){
                return next(ApiError.badRequest('Не введено newPassword або userId!'))
            }
            const user = await userService.changePassword(userId, newPassword)

            return res.json(user)
        }catch (e){
            next(e)
        }
    }

    async resendActivationMail(req, res, next){//TODO: робити перевірку на активованість?
        try{
            const {userId} = req.body
            if(!userId){
                return next(ApiError.badRequest('Не введено userId!'))
            }
            const user = await userService.resendActivationMail(userId)

            return res.json(user)
        }catch (e){
            next(e)
        }
    }

}

module.exports = new userController()