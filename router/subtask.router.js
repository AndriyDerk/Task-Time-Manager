const Router = require('express')
const router = new Router()
const subtaskController = require('../controller/subtask.controller')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create',authMiddleware, subtaskController.create)
router.get('/subtasks',authMiddleware, subtaskController.getAllByTask)
router.put('/delete',authMiddleware, subtaskController.delete)

module.exports = router