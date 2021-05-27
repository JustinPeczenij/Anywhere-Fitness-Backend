const router = require('express').Router()
const Classes = require('../routers-models/classes/classes-model')
const restricted = require('../routers-models/users/restricted-middleware')
const cmw = require('../routers-models/classes/classes-middleware')


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
                    num_registered: parseInt(cl.num_registered),
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

router.get('/:id', restricted, cmw.checkClassId, async (req, res, next) => {
    try {
        res.status(200).json(req.classById)
    } catch(err) {
        next(err)
    }
})

//GET ALL CLIENT IN SPECIFIC CLASS?
/// /:id/reserved

router.post('/', restricted, cmw.checkBody, async (req, res, next) => {
    try {
        const newClass = await Classes.add(req.newClass)
        res.status(201).json(newClass)
    } catch(err) {
        next(err)
    }
})

router.delete('/:id', restricted, cmw.checkClassId, async (req, res, next) => {
    try {
        await Classes.remove(req.params.id)
        res.status(202).json(req.classById)
    } catch(err) {
        next(err)
    }
})

router.put('/:id', restricted, cmw.checkClassId, async (req, res, next) => {
    try {
        const newClass = await Classes.update(req.params.id, req.body)
        res.status(200).json(newClass)
    } catch(err) {
        next(err)
    }
})


module.exports = router