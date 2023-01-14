const Router = require('express')
const router = new Router()
const userController = require('../controller/user.controller')
const authMiddleware = require('../middleware/authMiddleware');

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', authMiddleware, userController.refresh)
router.get('/activate/:link', userController.activate)
router.get('/validPassword',authMiddleware, userController.validPassword)
router.put('/changeEmail', authMiddleware, userController.changeEmail)
router.put('/changePassword', authMiddleware, userController.changePassword)
router.put('/rename', authMiddleware, userController.rename)

module.exports = router