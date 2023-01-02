const Router = require(`express`)
const router = new Router()
const projectRouter = require('./project.router')
const taskRouter = require('./task.router')
const userRouter = require('./user.router')

router.use('/user', userRouter)
router.use('/project', projectRouter)
router.use('/task', taskRouter)

module.exports = router