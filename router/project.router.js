const Router = require('express')
const router = new Router()
const projectController = require('../controller/project.controller')
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create',authMiddleware, projectController.create)
router.get('/myprojects',authMiddleware, projectController.getAllByUser)
router.put('/delete',authMiddleware, projectController.delete)
 
module.exports = router