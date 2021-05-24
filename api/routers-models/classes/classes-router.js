const router = require('express').Router()
const Classes = require('./classes-model')
const restricted = require('../users/restricted-middleware')

// YOU NEED TO JOIN TABLES AND RESTRUCTURE THE DATA FOR INSTRUCTOR AND ROLE 

router.get('/', restricted, async (req, res, next) => {
    try {
        const allClasses = await Classes.getAll()
        res.status(200).json(allClasses)
    } catch(err) {
        next(err)
    }
})

router.get('/:id', restricted, async (req, res, next) => {
    try {
        const classById = await Classes.getById(req.params.id)
        res.status(200).json(classById)
    } catch(err) {
        next(err)
    }
})

// router.post('/', async (req, res, next) => {
//     try {
//         const classById = await Classes.getById(req.params.id)
//         res.status(200).json(classById)
//     } catch(err) {
//         next(err)
//     }
// })


module.exports = router