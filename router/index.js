const Router = require('express')
const router = new Router()
const projectRouter = require('./project.router')
const taskRouter = require('./task.router')
const userRouter = require('./user.router')
const subtaskRouter = require('./subtask.router')
const columnRouter = require('./column.router')
const tagRouter = require('./tag.router')

router.use('/user', userRouter)
router.use('/project', projectRouter)
router.use('/task', taskRouter)
router.use('/column', columnRouter)
router.use('/subtask', subtaskRouter)
router.use('/tag', tagRouter)


module.exports = router