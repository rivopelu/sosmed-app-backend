const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, min: 3, max: 40, unique: true },
    username: { type: String, required: true, min: 3, max: 20, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 6 },
    profilePicture: { type: String, default: "https://randomuser.me/api/portraits/lego/4.jpg" },
    coverPicture: { type: String, default: "" },
    followers: { type: Array, default: [] },
    following: { type: Array, default: [] },
    isAdmin: { type: Boolean, default: false },
    desc: { type: String, max: 50 },
    city: { type: String, max: 50 },
    from: { type: String, max: 50 },
    relationship: { type: Number, enum: [1, 2, 3] },
    created_at: { type: Number },
    updated_at: { type: Number },

});


module.exports = mongoose.model("User", UserSchema)