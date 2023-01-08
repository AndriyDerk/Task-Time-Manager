const Column = require('../models/column')
const ApiError = require(`../error/api.error`)

class columnService {

    async create(name, projectId){
        const candidate = await Column.findOne(name)
        if(candidate){
            throw ApiError.badRequest('кластер з такою назвою вже існує')
        }
        const column = await Column.create({name, projectId})

        return column
    }

    async getAllByProject(projectId){
        const columns = await Column.find(projectId)
        if(columns){
            throw ApiError.badRequest('не має жодниг columns?')
        }

        return columns
    }

    async delete(columnId){
        const column = await Column.findOneAndDelete({_id: columnId})
        if(!column){
            throw ApiError.badRequest('column з таким columnId не знайдено')
        }

        return column
    }

}

module.exports = new columnService()