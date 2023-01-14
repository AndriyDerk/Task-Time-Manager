const Task = require('../models/task')
const ApiError = require('../error/api.error')
const subtaskService = require('./subtask.service')
const tagService = require('./tag.service')

class  taskService{
    async create(projectId, title, description, order, columnId, deadline){
        const task = await Task.create({projectId, title, description, order, columnId, deadline})
        task.save()

        return task
    }

    async getAllByProject(projectId){
        const tasks = await Task.find({projectId})

        return tasks
    }

    async deleteAllByColumn(columnId){
        const tasks = await Task.deleteMany({columnId})
        let taskId, subtasks, tags
        for(let it in tasks) {
            taskId = tasks[it].task
            subtasks = await subtaskService.deleteAllByTask({taskId})
            tags = await tagService.deleteAllByTask({taskId})
        }

        return tasks
    }

    async delete(taskId){
        const task = await Task.findOneAndDelete({_id: taskId})
        if(!task){
            throw ApiError.notFound("task з таким taskId відсутній!")
        }
        const subtasks = await subtaskService.deleteAllByTask({taskId})
        const tags = await tagService.deleteAllByTask({taskId})

        return  ({task: task, subtask: subtasks, tags: tags})
    }

    async lastInOrder(projectId){
        const tasks = await Task.find({projectId}),
            order = await tasks.length + 1

        return await order
    }

    async changeOrder(taskId, columnId, order){
        const task = await Task.findById(taskId)
        let tf = 0, prevColumnId = task.columnId
        if(prevColumnId == columnId){// TODO: does it work?
            tf = 1
        }
        task.columnId = columnId
        task.order = order-0.5
        await task.save()

        if(!tf){
            const prevTasks = await this.sortTaskInColumn(prevColumnId)
        }
        const tasks = await this.sortTaskInColumn(columnId)

        return tasks
    }

    async rename(taskId, title){
        const task = await Task.findById(taskId)
        if(!task){
            throw ApiError.notFound('tasks з таким taskId не знайдено')
        }
        task.title = title
        task.save()

        return task
    }

    async changeDescription(taskId, description){
        const task = await Task.findById(taskId)
        if(!task){
            throw ApiError.notFound('tasks з таким taskId не знайдено')
        }
        task.description = description
        task.save()

        return task
    }

    async sortTaskInColumn(columnId){
        const tasks = await Task.find({columnId}).sort({order: 1})
        for(let it in tasks){
            tasks[it].order = Number(it) + Number(1)
            tasks[it].save()
        }

        return tasks
    }

}

module.exports = new taskService()