// models/Review.js

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        description: {
            type: String,
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true

        }
    }
);

const Review = mongoose.models?.Review || mongoose.model('Review', reviewSchema);
module.exports = Review;