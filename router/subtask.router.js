const Router = require('express')
const router = new Router()
const subtaskController = require('../controller/subtask.controller')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create',authMiddleware, subtaskController.create)
router.put('/rename',authMiddleware, subtaskController.rename)
router.get('/subtasks',authMiddleware, subtaskController.getAllByTask)
router.delete('/delete',authMiddleware, subtaskController.delete)
router.put('/isDone', authMiddleware, subtaskController.isDone)

module.exports = router