const { updateUser, deleteUser, getUser, FollowUser, UnFollowUser } = require('../controller/userController')

const router = require('express').Router()

// UPDATE USER
router.put('/update/:id', updateUser);

// DELETE USER
router.delete('/delete/:id', deleteUser);

// GET A USER
router.get('/:id', getUser)
// FOLLOW USER
router.put('/:id/follow', FollowUser)
// UNFOLLOW USER
router.put('/:id/unfollow', UnFollowUser)

module.exports = router