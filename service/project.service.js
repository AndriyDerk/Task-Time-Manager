const Project = require('../models/project')
const Task = require('../models/task')
const ProjectUser = require('../models/projectUser')
const ApiError = require(`../error/api.error`)

class projectService{

    async create(title, description, userId){
        const project = await Project.create({title, description})
        project.save()

        {//create a link between the project and the user
            let projectId = project._id.toString()
            const projectUser = await ProjectUser.create({projectId, userId})
            projectUser.save()
        }

        return project
    }

    async getAllByUser(userId){
        const projectsId = await ProjectUser.find({userId})
        if(!projectsId){
            throw ApiError.badRequest('Цей користувач не має жодних проектів!')
        }
        let projects = [], id
        projects[0]=projectsId[0]
        for (let it in projectsId) {
            id = projectsId[it].projectId
            projects[it] = await Project.findOne({_id: id})
        }

        return projects
    }

    async delete(projectId){
        const project = await Project.findByIdAndDelete(projectId)
        if(!project){
            throw ApiError.badRequest('Проєкт з таким projectId відсутній!')
        }
        const projectUser = await ProjectUser.findOneAndDelete({projectId: projectId})
        const tasks = await Task.deleteMany({projectId: projectId})

        return ({project: project, projectUser: projectUser, tasks: tasks})
    }
}

module.exports = new projectService()