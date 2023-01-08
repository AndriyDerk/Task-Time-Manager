const ApiError = require(`../error/api.error`)
const tokenService = require('../service/token.service')

module.exports = (req, res, next) =>{
    if(req.method === 'OPTIONS'){
        next()
    }
    try{
        const token = req.headers.authorization
        if(!token){
            return next(ApiError.badRequest('Користувач не авторизаваний'))
        }
        const accessToken = token.split(' ')[1]
        if(!accessToken){
            return next(ApiError.badRequest('Користувач не авторизаваний'))
        }

        const userData = tokenService.validateAccessToken(accessToken)
        if(!userData){
            return next(ApiError.badRequest('Користувач не авторизаваний'))
        }

        req.user = userData
        next()
    }catch (e){
        return next(ApiError.badRequest())
    }
};