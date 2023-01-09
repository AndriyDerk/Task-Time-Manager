const Tag = require('../models/tag')
const ApiError = require('../error/api.error')

class tagService{
    async create(title, color, taskId){
        const tag = await Tag.create({title, color, taskId})

        return tag
    }

    async getAllByTask(taskId){
        const tags = await Tag.deleteMany(taskId)

        return tags
    }

    async deleteAllByTask(taskId){
        const tags = await Tag.deleteMany(taskId)

        return tags
    }

    async delete(tagId){
        const tag = await Tag.findByIdAndDelete(tagId)
        if(!tag){
            throw ApiError.preconditionFailed('tag з таким tagId відсутній')
        }

        return tag
    }

}
module.exports = new tagService()