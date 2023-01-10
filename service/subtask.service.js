const ApiError = require('../error/api.error')
const Subtask = require('../models/subtask')

class subtaskService{

    async create(description, taskId){
        const subtask = await Subtask.create({description, taskId})

        return subtask
    }

    async rename(subtaskId, description){
        const subtask = await Subtask.findById(subtaskId)
        if(!subtask){
            throw ApiError.notFound('subtasks з таким subtaskId не знайдено')
        }
        subtask.description = description
        subtask.save()

        return subtask
    }

    async getAllByTask(taskId){
        const subtasks = await Subtask.find({taskId})
        if(!subtasks){
            throw ApiError.notFound('subtasks з таким taskId не знайдено')
        }

        return subtasks
    }

    async deleteAllByTask(taskId){
        const subtasks = await Subtask.deleteMany(taskId)

        return subtasks
    }

    async delete(subtaskId){
        const subtask = await Subtask.findOneAndDelete(subtaskId)
        if(!subtask){
            throw ApiError.notFound('subtask з таким subtaskId не знайдено')
        }

        return subtask
    }

}

module.exports = new subtaskService()