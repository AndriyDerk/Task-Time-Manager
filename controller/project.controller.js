const ApiError = require(`../error/api.error`)
const projectService = require('../service/project.service')

class projectController{
    async create(req, res, next){
        try{
            const {title, description, userId} = req.body
            if(!title || !userId){
                return next(ApiError.badRequest('Не вказано заголовок!'))
            }
            const project = await projectService.create(title, description, userId)

            return res.json(project)
        }catch (e){
            next(e)
        }
    }
    async rename(req, res, next){
        try{
            const {projectId, name} = req.body
            if(!projectId || !name){
                return next(ApiError.badRequest('Не вказано columnId або name!'))
            }
            const project = await projectService.rename(projectId, name)

            return res.json(project)
        }catch (e) {
            next(e)
        }
    }
    async getAllByUser(req, res, next){
        try{
            const {userId} = req.body
            if(!userId){
                return next(ApiError.badRequest('Не вказано userId!'))
            }
            const projects = await projectService.getAllByUser(userId)

            return res.json(projects)
        }catch (e) {
            next(e)
        }
    }

    async getAllMembers(req, res, next){
        try{
            const {projectId} = req.body
            if(!projectId){
                return next(ApiError.badRequest('Не вказано projectId!'))
            }
            const members = await projectService.getAllMembers(projectId)

            return res.json(members)
        }catch (e) {
            next(e)
        }
    }

    async delete(req, res, next){
        try{
            const {projectId} = req.body
            if(!projectId){
                return next(ApiError.badRequest('Не вказано projectId!'))
            }
            const deleteData = await projectService.delete(projectId)

            return res.json(deleteData)
        }catch (e) {
            next(e)
        }
    }

    async changeDescription(req, res ,next){
        try{
            const {projectId, description} = req.body
            if(!projectId || !description){
                return next(ApiError.badRequest('Не введено description або projectId!'))
            }
            const project = await projectService.changeDescription(projectId, description)

            return res.json(project)
        }catch (e){
            next(e)
        }
    }

}

module.exports = new projectController()