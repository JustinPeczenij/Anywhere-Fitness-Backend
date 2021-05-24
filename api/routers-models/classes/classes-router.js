const router = require('express').Router()

router.get('/', (req, res) => {
    res.send('classes')
})

module.exports = router