const Project = require('../models/project')

class projectController{
    async create(req, res, next){
        const {title, description, hashtags, membersId, adminsId} = req.body
        if(!title || !adminsId){
            return console.log(`Oooops... something went wrong!`)//TODO: чи потрібно передати параметр в `res`
        }
        const project = await Project.create({title, description, hashtags, membersId, adminsId})
        project.save()
        return res.json(project)
    }
    async rename(req, res, net){//TODO: next time do it!

    }
    async getAllByUser(req, res, next){// TODO: перевірити чи працює
        const {id} = req.body
        if(!id){
            return console.log(`Oooops... something went wrong!`)//TODO: чи потрібно передати параметр в `res`
        }
        const projects = await Project.findOne({__id: [id]})// TODO: __id?
        return res.json(projects)

    }
    async delete(req, res, next){// TODO: перевірити чи працює
        const {id} = req.body
        if(!id){
            return console.log(`Oooops... something went wrong!`)//TODO: чи потрібно передати параметр в `res`
        }
        const project = await Project.findOneAndDelete({__id: id})//TODO: need to save?
        return res.json(project)//TODO: потрібно повератати і чи так воно видаляється?
    }
}

module.exports = new projectController()