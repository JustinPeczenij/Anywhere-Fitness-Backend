const router = require('express').Router()
const Users = require('./users-model')
const restricted = require('./restricted-middleware')
const umw = require('./users-middleware')

// [GET] all users
router.get('/', restricted, async (req, res, next) => {
    try {
        const allUsers = await Users.getAll()
        res.status(200).json(allUsers)
    } catch(err) {
        next(err)
    }
})

// [GET] all instructors
router.get('/instructors', restricted, async (req, res, next) => {
    try {
        const allInstructors = await Users.getInstructors()
        res.status(200).json(allInstructors)
    } catch(err) {
        next(err)
    }
})

// [GET] all clients
router.get('/clients', restricted, async (req, res, next) => {
    try {
        const allClients = await Users.getClients()
        res.status(200).json(allClients)
    } catch(err) {
        next(err)
    }
})

// [GET] current user
router.get('/current', restricted, async (req, res, next) => {
    try {
        const info = {
            user_id: req.decodedJwt.sub,
            username: req.decodedJwt.username,
            email: req.decodedJwt.email,
            role: req.decodedJwt.role,
        }
        res.status(200).json(info)
    } catch(err) {
        next(err)
    }
})

// [GET] user by id
router.get('/:id', restricted, umw.checkUserId, (req, res) => {
    res.status(200).json(req.user)
})

router.put('/:id', restricted, umw.checkUserId, async (req, res, next) => {
    try {
        const updated = await Users.update(req.params.id, req.body)
        res.status(202).json(updated)
    } catch(err) {
        next(err)
    }
})

router.delete('/:id', restricted, umw.checkUserId, async (req, res, next) => {
    try {
        await Users.remove(req.params.id)
        res.status(200).json(req.user)
    } catch(err) {
        next(err)
    }
})

module.exports = router