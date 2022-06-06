const { updateUser, deleteUser, getUser } = require('../controller/userController')

const router = require('express').Router()

// UPDATE USER
router.put('/update/:id', updateUser);

// DELETE USER
router.delete('/delete/:id', deleteUser);

// GET A USER
router.get('/:id', getUser)
// FOLLOW USER

// UNFOLLOW USER

module.exports = router