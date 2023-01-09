const Project = require('../models/project')
const ProjectUser = require('../models/projectUser')
const ApiError = require('../error/api.error')
const taskService = require('../service/task.service')

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
            throw ApiError.notFound('Цей користувач не має жодних проектів!')
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
            throw ApiError.notFound('Проєкт з таким projectId відсутній!')
        }
        const tasks = await taskService.deleteAllByProject(projectId)

        return ({project: project, tasks: tasks})//TODO: return subtasks?
    }
}

module.exports = new projectService()