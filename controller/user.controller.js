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
            return res.json(userData)
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
            return res.json(userData)
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
}

module.exports = new userController()