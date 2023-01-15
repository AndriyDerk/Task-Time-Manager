const Router = require('express')
const router = new Router()
const projectController = require('../controller/project.controller')
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create',authMiddleware, projectController.create)
router.put('/rename',authMiddleware, projectController.rename)
router.put('/changeDescription',authMiddleware, projectController.changeDescription)
router.get('/projects',authMiddleware, projectController.getAllByUser)
router.get('/members',authMiddleware,projectController.getAllMembers)
router.delete('/delete',authMiddleware, projectController.delete)

 
module.exports = router