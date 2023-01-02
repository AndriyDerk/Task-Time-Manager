const Router = require('express')
const router = new Router()
const projectController = require('../controller/project.controller')

router.post('/create', projectController.create)
router.get('/myprojects', projectController.getAllByUser)
router.put('/delete', projectController.delete)

module.exports = router