const Task = require('../models/task')
const ApiError = require('../error/api.error')
const subtaskService = require('./subtask.service')
const tagService = require('./tag.service')
const columnService = require('./column.service')

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

    async deleteAllByProject(projectId){
        const tasks = await Task.deleteMany({projectId})
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
        const task = await Task.findOne({taskId: taskId})
        let tf = 0, prevColumnId = task.columnId
        if(prevColumnId == columnId){// TODO: does it work?
            tf = 1
        }
        task.columnId = columnId
        task.order = order-0.5
        task.save()// TODO: does it work?

        if(tf){
            const prevColumn = await columnService.sortColumn(prevColumnId)
        }
        const column = await columnService.sortColumn(columnId)

        return column
    }

}

module.exports = new taskService()