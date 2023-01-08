const ApiError = require(`../error/api.error`)
const taskService = require('../service/task.service')

class taskController{
    async create(req, res, next){
        try{
            const {projectId, title, description, deadline} = req.body
            if(!title || !projectId){
                return next(ApiError.badRequest("Не введено заголовок!"))//TODO: чи треба писати за id?
            }
            const task = await taskService.create(projectId, title, description, deadline)
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
}

module.exports = new taskController()