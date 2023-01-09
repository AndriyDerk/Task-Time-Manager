const ApiError = require(`../error/api.error`)
const subtaskService = require('../service/subtask.service')

class subtaskController{
    async create(req, res, next){
        try{
            const {description, taskId} = req.body
            if(!description || !taskId){
                return ApiError.badRequest('Не введено description або taskId')
            }
            const subtask = await subtaskService.create(description, taskId)

            return res.json(subtask)
        }catch (e){
            next(e)
        }
    }

    async getAllByTask(req, res, next){
        try{
            const {taskId} = req.body
            if(!taskId){
                return ApiError.badRequest('Не введено taskId')
            }
            const subtasks = await subtaskService.getAllByTask(taskId)

            return res.json(subtask)
        }catch (e){
            next(e)
        }
    }

    async delete(req, res, next){
        try{
            const {subtaskId} = req.body
            if(!subtaskId){
                return ApiError.badRequest('Не введено subtaskId')
            }
            const subtask = await subtaskService.delete(subtaskId)

            return subtask
        }catch (e){
            next(e)
        }
    }


}

module.exports = new subtaskController()