// models/Recipe.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = User;
