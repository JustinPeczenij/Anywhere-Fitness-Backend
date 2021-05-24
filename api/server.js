const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const authRouter = require('./routers-models/auth/auth-router')
const classesRouter = require('./routers-models/classes/classes-router')
const usersRouter = require('./routers-models/users/users-router')

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors({
    origin: 'https://ft-anywhere-fitness-2.herokuapp.com'
}))

server.use('/', authRouter)
server.use('/users', usersRouter)
server.use('/classes', classesRouter)

server.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack
    })
})

module.exports = server
