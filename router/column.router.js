const Router = require('express')
const router = new Router()
const columnController = require('../controller/column.controller')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create',authMiddleware, columnController.create)
router.get('/columns',authMiddleware, columnController.getAllByProject)
router.delete('/delete',authMiddleware, columnController.delete)

module.exports = router