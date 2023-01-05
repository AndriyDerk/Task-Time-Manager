const Project = require('../models/project')
const Task = require('../models/task')
const ProjectUser = require('../models/projectUser')
const ApiError = require(`../error/api.error`)

class projectController{
    async create(req, res, next){
        const {title, description, userId} = req.body
        if(!title || !userId){
            return next(ApiError.badRequest('Не вказано заголовок!'))//TODO:  userId?
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
            return next(ApiError.badRequest('Не вказано userId!'))
        }
        const projectsId = await ProjectUser.find({userId})
        if(!projectsId){
            return next(ApiError.badRequest('Цей користувач не має жодних проектів!'))
        }
        let projects = [], id
        projects[0]=projectsId[0]
        for (let it in projectsId) {
            id = projectsId[it].projectId
            projects[it] = await Project.findOne({_id: id})
        }
        return res.json({projects})
    }
    async delete(req, res, next){
        const {projectId} = req.body
        if(!projectId){
            return next(ApiError.badRequest('Не вказано projectId!'))
        }
        const project = await Project.findOneAndDelete({_id: projectId})
        if(!project){
            return next(ApiError.badRequest('Проєкт з таким projectId віжсутній!'))
        }
        const tasks = await Task.deleteMany({projectId: projectId})
        return res.json({tasks})
    }
}

module.exports = new projectController()