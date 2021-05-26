//package imports
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

// router imports
const authRouter = require('./routers/auth-router')
const classesRouter = require('./routers/classes-router')
const usersRouter = require('./routers/users-router')
const reservedRouter = require('./routers/reserved-router')

//Middleware
const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors({
    origin: '*'
}))

//Routes
server.use('/', authRouter)
server.use('/users', usersRouter)
server.use('/classes', classesRouter)
server.use('/reserved', reservedRouter)

//error handling middleware
server.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack
    })
})

module.exports = server
