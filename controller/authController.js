
const User = require('../models/User')


// REGISTER
exports.RegisterController = async (req, res) => {
    const time = await new Date().getTime()
    const { name, username, email, password } = req.body
    const user = await new User({
        name, username, email, password,
        created_at: time
    })

    await user.save()
    try {
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json(error)
    }
}