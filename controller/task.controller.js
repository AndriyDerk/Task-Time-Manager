const Task = require('../models/task')
const ApiError = require(`../error/api.error`)

class taskController{
    async create(req, res, next){
        try{
            const {projectId, title, description, deadline, underTaskId} = req.body
            if(!title || !projectId){
                return next(ApiError.badRequest("Не введено заголовок!"))//TODO: чи треба писати за id?
            }
            const task = await Task.create({projectId, title, description, deadline, underTaskId})
            task.save()
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
            const tasks = await Task.find({projectId})
            if(!tasks){
                return next(ApiError.badRequest("projectId введено неправильно!"))
            }
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
            const task = await Task.findOneAndDelete({_id: taskId})
            if(!task){
                return next(ApiError.badRequest("task з таким taskId відсутній!"))
            }
            return res.json({task})
        }catch (e) {
            next(e)
        }
    }
}

module.exports = new taskController()