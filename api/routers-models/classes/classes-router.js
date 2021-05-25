const router = require('express').Router()
const Classes = require('./classes-model')
const restricted = require('../users/restricted-middleware')

// YOU NEED TO JOIN TABLES AND RESTRUCTURE THE DATA FOR INSTRUCTOR AND ROLE 
//maybe make classes/all to stay congruent or vise versa
router.get('/', restricted, async (req, res, next) => {
    try {
        const allClasses = await Classes.getAll()
        const formatted = await allClasses.reduce((acc, cl) => {
            return acc.concat([
                {
                    class_id: cl.class_id,
                    name: cl.name,
                    type: cl.type,
                    date: cl.date,
                    start_time: cl.start_time,
                    duration: cl.duration,
                    intensity_level: cl.intensity_level,
                    location: cl.location,
                    num_registered: cl.num_registered,
                    max_class_size: cl.max_class_size,
                    instructor: {
                        user_id: cl.user_id,
                        username: cl.username,
                        email: cl.email,
                        role_name: cl.role_name
                    }
            }
        ])
        }, [])
        res.status(200).json(formatted)
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

router.post('/', restricted, async (req, res, next) => {
    try {
        const newClass = await Classes.add(req.body)
        res.status(200).json(newClass)
    } catch(err) {
        next(err)
    }
})


module.exports = router