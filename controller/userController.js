const User = require('../models/User');
const bcrypt = require('bcryptjs');


exports.updateUser = async (req, res) => {
    if (req.body.userId === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSaltSync(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }

        try {
            const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body, });
            res.status(200).json({
                message: "akun telah di update",
                data: user
            })
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json(" you can update only your account !")
    }
}


// DELETE USER
exports.deleteUser = async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {

        try {
            const user = await User.findByIdAndDelete({ _id: req.params.id });
            res.status(200).json({
                message: "Akun Telah di hapus",
            })
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json(" you can delete!")
    }
}


exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err)
    }
}