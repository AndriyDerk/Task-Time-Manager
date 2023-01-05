const Project = require('../models/project')
const ProjectUser = require('../models/projectUser')

class projectController{
    async create(req, res, next){
        const {title, description, userId} = req.body
        if(!title || !userId){
            return console.log(`Oooops... something went wrong!`)//TODO: чи потрібно передати параметр в `res`
        }
        const project = await Project.create({title, description})
        project.save()

        {//create a link between the project and the user
            let projectId = project._id.toString()
            const projectUser = await ProjectUser.create({projectId, userId})
            projectUser.save()
        }
        return res.json(project)
    }
    async rename(req, res, net){//TODO: next time do it!

    }
    async getAllByUser(req, res, next){
        const {userId} = req.body
        if(!userId){
            return console.log(`Oooops... something went wrong!`)//TODO: чи потрібно передати параметр в `res`
        }
        const projectsId = await ProjectUser.find({userId})
        let projects = [], id
        projects[0]=projectsId[0]
        for (let it in projectsId) {
            id = projectsId[it].projectId
            projects[it] = await Project.findOne({_id: id})
        }
        return res.json({projects})
    }
    async delete(req, res, next){// TODO: перевірити чи працює | ще потрібно видалити всі пов'язані з проектом таскі
        const {id} = req.body
        if(!id){
            return console.log(`Oooops... something went wrong!`)//TODO: чи потрібно передати параметр в `res`
        }
        const project = await Project.findOneAndDelete({_id: id})//TODO: need to save?
        return res.json(project)//TODO: потрібно повератати і чи так воно видаляється?
    }
}

module.exports = new projectController()