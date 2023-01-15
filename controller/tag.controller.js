const tagService = require('../service/tag.service')
const ApiError = require('../error/api.error')

class tagController{
    async create(req, res, next){
        try{
            const {title, color, taskId} = req.body
            if(!title || !taskId){
                return next(ApiError.badRequest('не вказано title або taskId'))
            }
            const tag = await tagService.create(title, color, taskId)

            return res.json(tag)
        }catch (e){
            next(e)
        }
    }

    async getAllByTask(req, res, next){
        try{
            const {taskId} = req.body
            if(!taskId){
                return next(ApiError.badRequest('не вказано taskId'))
            }
            const tags = await tagService.getAllByTask(taskId)

            return res.json(tags)
        }catch (e){
            next(e)
        }
    }

    async delete(req, res, next){
        try{
            const {tagId} = req.body
            if(!tagId){
                return next(ApiError.badRequest('не вказано tagId'))
            }
            const tag = await tagService.delete(tagId)

            return res.json(tag)
        }catch (e) {
            next(e)
        }
    }

    async changeColor(req, res, next){
        try{
            const {color, tagId} = req.body
            if(!color || !tagId){
                return next(ApiError.badRequest('Не вказано color або tagId!'))
            }
            const tag = await tagService.changeColor(tagId, color)

            return res.json(tag)
        }catch (e){
            next(e)
        }
    }

    async changeTitle(req, res, next){
        try{
            const {title, tagId} = req.body
            if(!title || !tagId){
                return next(ApiError.badRequest('Не вказано title або tagId!'))
            }
            const tag = await tagService.changeTitle(tagId, title)

            return res.json(tag)
        }catch (e){
            next(e)
        }
    }
}

module.exports = new tagController()