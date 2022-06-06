var bcrypt = require('bcryptjs');
const User = require('../models/User')
const colors = require('colors')

// REGISTER
exports.RegisterController = async (req, res) => {

    try {
        const time = await new Date().getTime()
        const { name, username, email, password } = req.body
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(password, salt)
        const user = await new User({
            name, username, email, password: hash,
            created_at: time
        })

        await user.save()
        try {
            res.status(201).json(user)
        } catch (error) {
            res.status(400).json(error)
        }
    } catch (error) {
        res.status(500).json(error)
    }

}


// LOGIN USER 

exports.LoginController = async (req, res) => {
    try {

        try {
            const { email, password } = req.body
            const user = await User.findOne({ email });
            !user && res.status(404).json({
                message: 'login gagal'
            })

            const validPassword = await bcrypt.compare(password, user.password)
            !validPassword && res.status(404).json({
                message: 'login gagal'
            })



            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }


    } catch (error) {
        res.status(500).json(error)
    }
}


