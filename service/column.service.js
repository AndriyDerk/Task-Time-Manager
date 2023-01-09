const Column = require('../models/column')
const ApiError = require(`../error/api.error`)

class columnService {

    async create(name, projectId){
        const candidate = await Column.findOne(name)
        if(candidate){
            throw ApiError.preconditionFailed('кластер з такою назвою вже існує')
        }
        const column = await Column.create({name, projectId})

        return column
    }

    async getAllByProject(projectId){
        const columns = await Column.find(projectId)
        if(!columns){
            throw ApiError.notFound('не має жодниг columns?')
        }

        return columns
    }

    async delete(columnId){
        const column = await Column.findOneAndDelete({_id: columnId})
        if(!column){
            throw ApiError.notFound('column з таким columnId не знайдено')
        }

        return column
    }

    async sortColumn(columnId){
        const column = await Column.findById(columnId).sort({order: 1})
        for(let it in column){
            column[it].order = it + 1
        }
        column.save()// TODO: does it work?

        return column
    }

}

module.exports = new columnService()