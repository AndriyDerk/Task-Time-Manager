const Task = require('../models/task')

class taskController{
    async create(req, res, next){// TODO: перевірити чи працює
        const {projectId, title, description, hashtags, deadline, underTaskId} = req.body
        if(!title || !description || !hashtags || !deadline || !underTaskId){
            return console.log(`Oooops... something went wrong!`)//TODO: чи потрібно передати параметр в `res`
        }
        const task = await Task.create({projectId, title, description, hashtags, deadline, underTaskId})
        task.save()//TODO: save?
        return res.json(task)// TODO: json не треба підключати?
    }
    async getAll(req, res, next){//TODO: працює, мб накше написати?// TODO: перевірити чи працює
        const tasks = await Task.find({createdAt: true})
        return res.json(tasks)
    }
    async getById(req, res, next){// TODO: перевірити чи працює
        const {id} = req.body
        if(!id){
            return console.log(`Oooops... something went wrong!`)//TODO: чи потрібно передати параметр в `res`
        }
        const task = await Task.findOne({__id: id})// TODO: __id?
        return res.json(task)
    }
    async delete(req, res, next){// TODO: перевірити чи працює
        const {id} = req.body
        if(!id){
            return console.log(`Oooops... something went wrong!`)//TODO: чи потрібно передати параметр в `res`
        }
        const task = await Task.findOneAndDelete({__id: id})//TODO: need to save?
        return res.json(task)//TODO: потрібно повератати і чи так воно видаляється?
    }
}

module.exports = new taskController()