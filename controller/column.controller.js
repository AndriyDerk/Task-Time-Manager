const ApiError = require(`../error/api.error`)
const columnService = require('../service/column.service')

class columnController{
    async create(req, res, next){
        try{
            const {name, projectId} = req.body
            if(!name || !projectId){
                return next(ApiError.badRequest('Не вказано name або projectId'))
            }
            const column = await columnService.create(name, projectId)

            return res.json(column)
        }catch (e) {
            next(e)
        }
    }

    async rename(req, res, next){//TODO: do next time
       try{
           const {columnId, name} = req.body
           if(!columnId || !name){
               return next(ApiError.badRequest('Не вказано columnId або name!'))
           }
           const column = await columnService.rename(columnId, name)

           return res.json(column)
       }catch (e) {
           next(e)
       }
    }

    async getAllByProject(req, res, next){
        try {
            const {projectId} = req.body
            if(!projectId){
                return next(ApiError.badRequest('Не вказано projectId!'))
            }
            const columns = await columnService.getAllByProject(projectId)

            return res.json(columns)
        }catch (e) {
            next(e)
        }
    }

    async delete(req, res, next){
        try{
            const {columnId} = req.body
            if(!columnId){
                return next(ApiError.badRequest('Не вказано columnId!'))
            }
            const column = await columnService.delete(columnId)

            return res.json(column)
        }catch (e) {
            next(e)
        }
    }
}

module.exports = new columnController()