const router = require('express').Router()

router.use('/api', require('./booksRoutes.js'))
router.use('/api', require('./googlebookRoutes'))

module.exports = router