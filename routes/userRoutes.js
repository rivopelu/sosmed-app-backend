const router = require('express').Router()

router.get('/', (req, res) => {
    res.send('Ini adalah user router')
})


module.exports = router