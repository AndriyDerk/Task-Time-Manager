const ApiError = require(`../error/api.error`)// TODO:

module.exports = function (err, req, res){
    if(err instanceof ApiError){
        return res.status(err.status).json({message: err.message})
    }

    throw ApiError.internal('Непередбачувана помилка!')
}