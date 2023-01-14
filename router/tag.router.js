const Router = require('express')
const router =  new Router()
const tagController = require('../controller/tag.controller')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', authMiddleware, tagController.create)
router.delete('/delete', authMiddleware, tagController.delete)
router.get('/getAllByTask', authMiddleware, tagController.getAllByTask)

module.exports = router