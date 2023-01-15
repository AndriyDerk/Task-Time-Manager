const Tag = require('../models/tag')
const ApiError = require('../error/api.error')

class tagService{
    async create(title, color, taskId){
        const tag = await Tag.create({title, color, taskId})

        return tag
    }

    async getAllByTask(taskId){
        const tags = await Tag.find({taskId})

        return tags
    }

    async deleteAllByTask(taskId){
        const tags = await Tag.deleteMany(taskId)

        return tags
    }

    async delete(tagId){
        const tag = await Tag.findByIdAndDelete(tagId)

        return tag
    }

    async changeColor(tagId, color){
        const tag = await Tag.findById(tagId)
        if(!tag){
            throw ApiError.notFound('tag не знайдено!')
        }
        tag.color = color
        await tag.save()

        return tag
    }

    async changeTitle(tagId, title){
        const tag = await Tag.findById(tagId)
        if(!tag){
            throw ApiError.notFound('tag не знайдено!')
        }
        tag.title = title
        await tag.save()

        return tag
    }

}
module.exports = new tagService()