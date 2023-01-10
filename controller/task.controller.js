const ApiError = require(`../error/api.error`)
const taskService = require('../service/task.service')

class taskController{
    async create(req, res, next){
        try{
            const {projectId, title, description, columnId, deadline} = req.body
            if(!title || !projectId || !columnId){
                return next(ApiError.badRequest("Не введено заголовок title, projectId або columnId"))
            }
            const order = await taskService.lastInOrder(projectId)
            const task = await taskService.create(projectId, title, description, order, columnId, deadline)
            return res.json({task})
        }catch (e) {
            next(e)
        }
    }
    async getAllByProject(req, res, next){
        try{
            const {projectId} = req.body
            if(!projectId){
                return next(ApiError.badRequest("Не введено projectId!"))
            }
            const tasks = await taskService.getAllByProject(projectId)

            return res.json({tasks})
        }catch (e) {
            next(e)
        }
    }
    async delete(req, res, next){
        try{
            const {taskId} = req.body
            if(!taskId){
                return next(ApiError.badRequest("Не введено taskId!"))
            }
            const task = await taskService.delete(taskId)

            return res.json({task})
        }catch (e) {
            next(e)
        }
    }

    async changeOrder(req, res, next){
        try{
            const {taskId, columnId, order} = req.body
            if(!taskId || !columnId || !order){
                return ApiError.badRequest('Не введено projectId, taskId, columnId або order!')
            }
            const task = await taskService.changeOrder(taskId, columnId, order)

            return res.json(task)
        }catch(e){
            next(e)
        }
    }

    async rename(req, res ,next){
        try{
            const {taskId, name} = req.body
            if(!taskId || !name){
                return next(ApiError.badRequest('Не введено name або taskId!'))
            }
            const task = await taskService.rename(taskId, name)

            return res.json(task)
        }catch (e){
            next(e)
        }
    }

    async changeDescription(req, res, next){
        try{
            const {taskId, description} = req.body
            if(!taskId || !description){
                return next(ApiError.badRequest('Не введено description або taskId!'))
            }
            const task = await taskService.changeDescription(taskId, description)

            return res.json(task)
        }catch (e){
            next(e)
        }
    }

}

module.exports = new taskController()