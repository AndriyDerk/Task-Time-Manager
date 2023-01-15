const Column = require('../models/column')
const ApiError = require(`../error/api.error`)
const taskService = require('./task.service')

class columnService {

    async create(name, projectId){
        const candidate = await Column.findOne({name: name, projectId: projectId})
        if(candidate){
            throw ApiError.preconditionFailed('column з такою назвою вже існує')
        }
        const order = await this.getOrder(projectId),
            column = await Column.create({name, projectId, order})

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
        await column.save()

        return column
    }

    async getOrder(projectId){
        const columns = await Column.find({projectId}),
            len = Number(columns.length) + Number(1)

        return len
    }

    async changeOrder(columnId, projectId, order){
        const column = await Column.findById(columnId)
        column.order = order-0.5
        await column.save()
        const columns = await this.sortColumnsInProject(projectId)

        return columns
    }

    async sortColumnsInProject(projectId){
        const columns = await Column.find({projectId}).sort({order: 1})
        for(let it in columns){
            columns[it].order = Number(it) + Number(1)
            await columns[it].save()
        }

        return columns
    }

}

module.exports = new columnService()