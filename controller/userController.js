const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { json } = require('express/lib/response');


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
        const { password, updated_at, ...other } = user._doc
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err)
    }
}


// FOLLOW USER
exports.FollowUser = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { following: req.params.id } });
                res.status(200).json('user has been follow')
            } else {
                req.status(403), json("you allready follow")
            }
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json('You cannot follow ')
    }
}

// UNFOLLOW USER
exports.UnFollowUser = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { following: req.params.id } });
                res.status(200).json('user has been Unfollow')
            } else {
                req.status(403), json("you donnt follow this user")
            }
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json('You cannot Unfollow ')
    }
}
