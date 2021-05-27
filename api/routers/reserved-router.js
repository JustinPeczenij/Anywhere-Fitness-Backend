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
router.get('/:user_id', restricted, async (req, res, next) => {
    try {
        const reservedClass = await Reserved.getReservationsByUser(req.params.user_id)
        res.status(200).json(reservedClass)
    } catch(err) {
        next(err)
    }
})

//check for max_class_size before adding??

// [POST] user_id and class_id to Class_Client_Reservations table
// requires class_id in the req.body
router.post('/:user_id', restricted, cmw.checkClassId, async (req, res, next) => {
    try {
        if(!req.params.user_id || !req.body.class_id) next({ status: 422, message: 'user_id and class_id are required' })
        else {
            const [reservation] = await Reserved.addReservation({ class_id: req.body.class_id, user_id: req.params.user_id })
            let updatedNumRegistered
            reservation.reserved_clients
            ? updatedNumRegistered = {
                class_id: reservation.class_id,
                num_registered:  reservation.reserved_clients.length
            }
            : updatedNumRegistered = {
                class_id: reservation.class_id,
                num_registered:  parseInt(reservation.num_registered - 1)
            } 
            await Reserved.updateClassWithNumRegistered(updatedNumRegistered)
            res.status(201).json({ message: 'client has successfully reserved a spot'})
        }
    } catch(err) {
        next(err)
    }
})

//requires class_id in the body
router.delete('/:user_id', restricted, cmw.checkClassId, async (req, res, next) => {
    try {
        await Reserved.deleteReservation(req.body.class_id, req.params.user_id)
        // await Reserved.updateClassWithNumRegistered(deleted)
        res.status(200).json({ message: 'client has successfully removed their reservation'})
    } catch(err) {
        next(err)
    }
})

module.exports = router
