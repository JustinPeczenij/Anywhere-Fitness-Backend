const swaggerJsDoc = require('swagger-jsdoc')

const swaggerDefinition = {
    openapi: "3.0.3",
    info: {
        title: "Anywhere Fitness API",
        version: "1.0.0",
        description: "ft-anywhere-fitness-2",
        contact: {
            name: "Justin Peczenij",
            email: "justinpeczenij@gmail.com"
        },
    },
}

const options = {
    swaggerDefinition,
    apis: ["./routers/*.js"]
} 

const swaggerSpec = swaggerJsDoc(options)

module.exports = swaggerSpec
