const router = require('express').Router()
const Users = require('./users-model')
const restricted = require('./restricted-middleware')

// [GET] all users
router.get('/', restricted, async (req, res, next) => {
    try {
        const allUsers = await Users.getAll()
        res.status(200).json(allUsers)
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
router.get('/:id', restricted, async (req, res, next) => {
    try {
        const userById = await Users.findById(req.params.id)
        if(!userById) {
            next({ status: 404, message: `user with id ${req.params.id} was not found` })
        } else res.status(200).json(userById)
    } catch(err) {
        next(err)
    }
})

module.exports = router