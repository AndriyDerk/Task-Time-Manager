const ApiError = require(`../error/api.error`)
const subtaskService = require('../service/subtask.service')

class subtaskController{
    async create(req, res, next){
        try{
            const {description, taskId} = req.body
            if(!description || !taskId){
                return next(ApiError.badRequest('Не введено description або taskId'))
            }
            const subtask = await subtaskService.create(description, taskId)

            return res.json(subtask)
        }catch (e){
            next(e)
        }
    }

    async rename(req, res ,next){
        try{
            const {subtaskId, name} = req.body
            if(!subtaskId || !name){
                return next(ApiError.badRequest('Не введено name або subtaskId!'))
            }
            const subtask = await subtaskService.rename(subtaskId, name)

            return res.json(subtask)
        }catch (e){
            next(e)
        }
    }

    async getAllByTask(req, res, next){
        try{
            const {taskId} = req.body
            if(!taskId){
                return next(ApiError.badRequest('Не введено taskId'))
            }
            const subtasks = await subtaskService.getAllByTask(taskId)

            return res.json(subtasks)
        }catch (e){
            next(e)
        }
    }

    async delete(req, res, next){
        try{
            const {subtaskId} = req.body
            if(!subtaskId){
                return next(ApiError.badRequest('Не введено subtaskId'))
            }
            const subtask = await subtaskService.delete(subtaskId)

            return res.json(subtask)
        }catch (e){
            next(e)
        }
    }

    async isDone(req, res, next){
        try{
            const {subtaskId} = req.body
            if(!subtaskId){
                return next(ApiError.badRequest('Не введено subtaskId'))
            }
            const subtask = await subtaskService.isDone(subtaskId)

            return res.json(subtask)
        }catch (e){
            next(e)
        }
    }

}

module.exports = new subtaskController()