const Column = require('../models/column')
const ApiError = require(`../error/api.error`)
const taskService = require('./task.service')

class columnService {

    async create(name, projectId){
        const candidate = await Column.findOne({name})
        if(candidate){
            throw ApiError.preconditionFailed('кластер з такою назвою вже існує')
        }
        const column = await Column.create({name, projectId})

        return column
    }

    async getAllByProject(projectId){
        const columns = await Column.find({projectId})

        return columns
    }

    async deleteAllByProject(projectId){
        const columns = await Column.deleteMany({projectId})
        let columnId, tasks
        for(let it in columns){
            columnId = columns[it]._id
            tasks = await taskService.deleteAllByColumn(columnId)
        }

        return columns
    }

    async delete(columnId){
        const column = await Column.findOneAndDelete({_id: columnId})
        if(!column){
            throw ApiError.notFound('column з таким columnId не знайдено')
        }
        const tasks = await taskService.deleteAllByColumn(columnId)

        return ({column: column, tasks: tasks})
    }

    async rename(columnId, name){
        const column = await Column.findById(columnId)
        if(!column){
            throw ApiError.notFound('column з таким columnId не знайдено')
        }
        column.name = name
        column.save()

        return column
    }

}

module.exports = new columnService()