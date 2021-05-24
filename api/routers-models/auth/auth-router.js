const router = require('express').Router()

// Convert role to 1 or 2 (FOREIGN KEY) or tell team to pass role in as 1 or 2

router.get('/', (req, res) => {
    res.send('auth router')
})

router.post('/register', (req, res) => {
    res.send('register')
})

router.post('/login', (req, res) => {
    res.send('login')
})

module.exports = router