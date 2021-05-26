const router = require('express').Router()
const Reserved = require('../routers-models/reservations/reserved-model')
const restricted = require('../routers-models/users/restricted-middleware')
const cmw = require('../routers-models/classes/classes-middleware')

// [GET] returns array of all classes with reserved users array included
router.get('/', restricted, async (req, res, next) => {
    try {
        const classes = await Reserved.getClassesWithReserved()
        res.status(200).json(classes)
    } catch(err) {
        next(err)
    }
})

// [GET] returns array of reserved users for a specific class
router.get('/:class_id', restricted, cmw.checkClassId, async (req, res, next) => {
    try {
        const [reservedClass] = await Reserved.getReservationsByClass(req.params.class_id)
        res.status(200).json(reservedClass)
    } catch(err) {
        next(err)
    }
})

// [POST] user_id and class_id to Class_Client_Reservations table
router.post('/:class_id', restricted, cmw.checkClassId, async (req, res, next) => {
    try {
        if(!req.body.user_id || !req.params.class_id) next({ status: 422, message: 'user_id and class_id are required' })
        else {
            const [reservation] = await Reserved.addReservation({ class_id: req.params.class_id, user_id: req.body.user_id })
            const updatedNumRegistered = {
                ...reservation,
                num_registered: reservation.reserved_clients.length
            } 
            await Reserved.updateClassWithNumRegistered(updatedNumRegistered)
            res.status(201).json(updatedNumRegistered)
        }
    } catch(err) {
        next(err)
    }
})

module.exports = router
