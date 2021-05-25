const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
//Swagger Documentation
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

// configure and set up swagger
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Anywhere Fitness API",
            description: "ft-anywhere-fitness-2",
            contact: {
                name: "Justin Peczenij",
                email: "justinpeczenij@gmail.com"
            },
            version: "1.0.1",
            servers: [
                {
                url: "http://localhost:5000"
                },
            ],
        },
    },

    apis: ["./routers/*.js"],   
}


// servers: ['https://ft-anywhere-fitness-2.herokuapp.com/']
 
const authRouter = require('./routers/auth-router')
const classesRouter = require('./routers/classes-router')
const usersRouter = require('./routers/users-router')
const reservedRouter = require('./routers/reserved-router')

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors({
    origin: '*'
}))

server.use('/', authRouter)
server.use('/users', usersRouter)
server.use('/classes', classesRouter)
server.use('/reserved', reservedRouter)

const swaggerDocs = swaggerJsDoc(swaggerOptions)
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

//Routes
/**
 * @swagger
 * /test:
 *  get:
 *      description: register a new user to the database and return a token
 *      responses:
 *          '200':
 *              description: {user object, token}
 */   
server.get('/test', (req, res) => {
    res.status(200).send('test')
})

server.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack
    })
})

module.exports = server
