const Router = require('express')
const router = new Router()
const columnController = require('../controller/column.controller')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create',authMiddleware, columnController.create)
router.put('/rename', authMiddleware, columnController.rename)
router.put('/changeOrder', authMiddleware, columnController.changeOrder)
router.get('/columns',authMiddleware, columnController.getAllByProject)
router.delete('/delete',authMiddleware, columnController.delete)

module.exports = router