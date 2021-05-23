const router = require('express').Router()

router.get('/login', (req, res) => {
    res.send('banana')
})

module.exports = router