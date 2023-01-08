const ApiError = require('../error/api.error')
const Subtask = require('../models/subtask')

class subtaskService{

    async create(description, taskId){
        const subtask = await Subtask.create({description, taskId})

        return subtask
    }

    async getAllByTask(taskId){
        const subtasks = await Subtask.find({taskId})
        if(!subtasks){
            throw ApiError.badRequest('subtasks з таким taskId не знайдено')
        }

        return subtasks
    }

    async delete(subtaskId){
        const subtask = await Subtask.findOneAndDelete(subtaskId)
        if(!subtask){
            throw ApiError.badRequest('subtask з таким subtaskId не знайдено')
        }

        return subtask
    }

}

module.exports = new subtaskService()