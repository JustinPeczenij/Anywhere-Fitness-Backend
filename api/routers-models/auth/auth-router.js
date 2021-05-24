const router = require('express').Router()
const Users = require('../users/users-model')
const amw = require('./auth-middleware')

const bcrypt = require('bcrypt')
const tokenBuilder = require('./tokenBuilder')

//roles are converted to 1-INSTRUCTOR or 2-CLIENT
router.post('/register', amw.convertRoles, async (req, res, next) => {
    // hash new user's password
    try {
    let user = req.body
    const rounds = Number(String(process.env.BCRYPT_ROUNDS))
    const hash = bcrypt.hashSync(user.password, rounds)
    user.password = hash
    // add new user to db
        const newUser = await Users.add(req.body)
        res.status(201).json(newUser)
    } catch(err) {
        next(err)
    }
})

router.post('/login', amw.checkCredentialsLogin, async (req, res, next) => { 
    try {
        let {username, password} = req.body
        const user = await Users.findByUsername(username)
        if(user && bcrypt.compareSync(password, user.password)){
            const token = tokenBuilder(user)
            res.status(200).json({
                message: `${user.username} was successfully logged in`,
                token
            });
        } else res.status(400).json({ message: 'invalid credentials' })
    } catch(err) {
        next()
    }
})

module.exports = router