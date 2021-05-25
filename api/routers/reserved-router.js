const router = require('express').Router()
const Reserved = require('../routers-models/reservations/reserved-model')
const restricted = require('../routers-models/users/restricted-middleware')
const cmw = require('../routers-models/classes/classes-middleware')

// returns array of reserved users
router.get('/:class_id', restricted, cmw.checkClassId, async (req, res, next) => {
    try {
        const reservedClass = await Reserved.getReservationsByClass(req.params.class_id)
        res.status(200).json(reservedClass)
    } catch(err) {
        next(err)
    }
})


module.exports = router
