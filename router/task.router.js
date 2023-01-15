const Router = require('express')
const router = new Router()
const taskController = require('../controller/task.controller')
const authMiddleware = require("../middleware/authMiddleware");

router.post('/create', authMiddleware, taskController.create)
router.get('/tasks', authMiddleware, taskController.getAllByProject)
router.delete('/delete', authMiddleware, taskController.delete)
router.put('/rename', authMiddleware, taskController.rename)
router.put('/changeOrder', authMiddleware, taskController.changeOrder)
router.put('/changeDescription', authMiddleware, taskController.changeDescription)
router.put('/addSpendTime', authMiddleware, taskController.addSpendTime)
router.put('/workingNow', authMiddleware, taskController.workingNow)
router.put('/changeDeadline', authMiddleware, taskController.changeDeadline)

module.exports = router