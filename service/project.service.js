const Project = require('../models/project')
const User = require('../models/user')
const ProjectUser = require('../models/projectUser')
const ApiError = require('../error/api.error')
const columnService = require('../service/column.service')

class projectService{

    async create(title, description, userId){
        const project = await Project.create({title, description})
        project.save()

        {//create a link between the project and the user
            let projectId = project._id
            const projectUser = await ProjectUser.create({projectId, userId})
            projectUser.save()
        }

        return project
    }

    async getAllByUser(userId){
        const projectUsers = await ProjectUser.find({userId})
        if(!projectUsers){
            throw ApiError.notFound('Цей користувач не має жодних проектів!')
        }
        let projects = [], id
        projects[0]=projectUsers[0]
        for (let it in projectUsers) {
            id = projectUsers[it].projectId
            projects[it] = await Project.findOne({_id: id})
        }

        return projects
    }

    async getAllMembers(projectId){
        const projectUsers = await ProjectUser.find({projectId})
        if(!projectUsers){
            throw ApiError.notFound('project з таким projectId відсутній!')
        }
        let members = [], id
        members[0]=projectUsers[0]
        for (let it in projectUsers) {
            id = projectUsers[it].projectId
            members[it] = await User.findOne({_id: id})
        }

        return members
    }

    async rename(projectId, title){
        const project = await Project.findById(projectId)
        if(!project){
            throw ApiError.notFound('Проєкт з таким projectId відсутній!')
        }
        project.title = title
        project.save()

        return project
    }

    async delete(projectId){
        const project = await Project.findByIdAndDelete(projectId)
        if(!project){
            throw ApiError.notFound('Проєкт з таким projectId відсутній!')
        }
        const columns = await columnService.deleteAllByProject(projectId)

        return ({project: project,columns: columns})
    }
}

module.exports = new projectService()