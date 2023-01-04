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
        let id = userId.toString()//TODO
        const projectsId = await ProjectUser.find({id})
        let project, val, projects
        for (let it in projectsId){
            val = projectsId[it].projectId
            project = await Project.findOne({val})
            console.log(project)
            projects += project
        }
        // let obj = JSON.parse(projects)
        return res.json({projects})

    }
    async delete(req, res, next){// TODO: перевірити чи працює
        const {id} = req.body
        if(!id){
            return console.log(`Oooops... something went wrong!`)//TODO: чи потрібно передати параметр в `res`
        }
        const project = await Project.findOneAndDelete({_id: id})//TODO: need to save?
        return res.json(project)//TODO: потрібно повератати і чи так воно видаляється?
    }
}

module.exports = new projectController()