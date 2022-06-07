const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    desc: { type: String, },
    img: { type: String, },
    likes: { type: Array, default: [] },
    created_at: { type: Number },
    updated_at: { type: Number },

});


module.exports = mongoose.model("Post", PostSchema)