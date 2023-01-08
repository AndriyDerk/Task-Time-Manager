const Task = require('../models/task')
const ApiError = require(`../error/api.error`)

class  taskService{
    async create(projectId, title, description, deadline){
        const task = await Task.create({projectId, title, description, deadline})
        task.save()

        return task
    }

    async getAllByProject(projectId){
        const tasks = await Task.find({projectId})
        if(!tasks){
            throw ApiError.badRequest("projectId введено неправильно!")
        }

        return tasks
    }

    async delete(taskId){
        const task = await Task.findOneAndDelete({_id: taskId})
        if(!task){
            throw ApiError.badRequest("task з таким taskId відсутній!")
        }

        return  task
    }

}

module.exports = new taskService()