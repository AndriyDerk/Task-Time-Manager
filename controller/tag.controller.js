const tagService = require('../service/tag.service')
const ApiError = require('../error/api.error')

class tagController{
    async create(req, res, next){
        try{
            const {title, color, taskId} = req.body
            if(!title || !color || !taskId){
                return ApiError.badRequest('не вказано title, color або taskId')
            }
            const tag = await tagService.create(title, color, taskId)

            return res.json(tag)
        }catch (e){
            next(e)
        }
    }

    async delete(req, res, next){
        try{
            const {tagId} = req.body
            if(!tagId){
                return ApiError.badRequest('не вказано tagId')
            }
            const tag = await tagService.delete(tagId)

            return res.json(tag)
        }catch (e) {
            next(e)
        }
    }

}

module.exports = new tagController()