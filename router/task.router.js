const Router = require('express')
const router = new Router()
const taskController = require('../controller/task.controller')
const authMiddleware = require("../middleware/authMiddleware");

router.post('/create', authMiddleware, taskController.create)
router.get('/tasks', authMiddleware, taskController.getAllByProject)
router.delete('/delete', authMiddleware, taskController.delete)

module.exports = router