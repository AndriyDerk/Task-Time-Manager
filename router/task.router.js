const Router = require('express')
const router = new Router()
const taskController = require('../controller/task.controller')
const authMiddleware = require("../middleware/authMiddleware");

router.post('/create', authMiddleware, taskController.create)
router.get('/getById', authMiddleware, taskController.getById)//TODO: не потрібно?
router.get('/mytasks', authMiddleware, taskController.getAll)//TODO: не потрібно?
router.put('delete', authMiddleware, taskController.delete)

module.exports = router