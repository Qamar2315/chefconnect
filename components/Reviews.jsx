"use client"

import React, { useState, useEffect } from 'react';
import Review from '@components/Review';

const Reviews = ({ initialReviews }) => {
    const [reviews, setReviews] = useState(initialReviews || [{rating:1,description:"good",author:{"name":"Qamar"}}]);
    const [newRating, setNewRating] = useState(0);
    const [newComment, setNewComment] = useState('');

    const handleAddReview = (e) => {
        e.preventDefault();
        if (newRating > 0 && newComment.trim() !== '') {
            setReviews([...reviews, { rating: newRating, comment: newComment }]);
            setNewRating(0);
            setNewComment('');
        }
    };

    const handleDeleteReview = (index) => {
        setReviews(reviews.filter((_, i) => i !== index));
    };

    return (
        <div className="flex flex-col space-y-4">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="overflow-y-auto max-h-96 border border-gray-200 rounded-md p-4">
                {reviews.length === 0 && <p>No reviews yet.</p>}
                {reviews.map((review, index) => (
                    <Review
                        key={index}
                        {...review}
                        author={ "qamar" }
                        onDelete={() => handleDeleteReview(index)}
                    />
                ))}
            </div>
            <form onSubmit={handleAddReview} className="flex items-center">
                <select
                    value={newRating}
                    onChange={(e) => setNewRating(parseInt(e.target.value))}
                    className="border border-gray-300 rounded-md px-2 py-1 mr-4"
                >
                    <option value="0">Rate</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1 flex-grow"
                    placeholder="Write your review..."
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ml-4">
                    Add Review
                </button>
            </form>
        </div>
    );
};

export default Reviews;