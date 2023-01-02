const Router = require('express')
const router = new Router()
const taskController = require('../controller/task.controller')

router.post('/create', taskController.create)
router.get('/getById', taskController.getById)
router.get('/mytasks', taskController.getAll)
router.put('delete', taskController.delete)

module.exports = router