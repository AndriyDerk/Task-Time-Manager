const Router = require('express')
const router = new Router()
const userController = require('../controller/user.controller')
const authMiddleware = require('../middleware/authMiddleware');

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', authMiddleware, userController.refresh)
router.get('/activate/:link', userController.activate)

module.exports = router