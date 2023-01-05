const Task = require('../models/task')
const ApiError = require(`../error/api.error`)

class taskController{
    async create(req, res, next){
        const {projectId, title, description, deadline, underTaskId} = req.body
        if(!title || !projectId){
            return next(ApiError.badRequest("Не введено заголовок!"))//TODO: чи треба писати за id?
        }
        const task = await Task.create({projectId, title, description, deadline, underTaskId})
        task.save()
        return res.json({task})
    }
    async getAllByProject(req, res, next){
        const {projectId} = req.body
        if(!projectId){
            return next(ApiError.badRequest("Не введено projectId!"))
        }
        const tasks = await Task.find({projectId})
        if(!tasks){
            return next(ApiError.badRequest("projectId введено неправильно!"))
        }
        return res.json({tasks})
    }
    async delete(req, res, next){
        const {taskId} = req.body
        if(!taskId){
            return next(ApiError.badRequest("Не введено taskId!"))
        }
        const task = await Task.findOneAndDelete({_id: taskId})
        if(!task){
            return next(ApiError.badRequest("task з таким taskId відсутній!"))
        }
        return res.json({task})
    }
}

module.exports = new taskController()