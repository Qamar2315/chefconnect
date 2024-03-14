"use client"

import React, { useState, useEffect } from 'react';
import Review from '@components/Review';
import axios from "axios";

const Reviews = ({ recipe, session }) => {
    const [reviews, setReviews] = useState(recipe.reviews);
    const [newRating, setNewRating] = useState(0);
    const [newComment, setNewComment] = useState('');

    const handleAddReview = async (e) => {
        e.preventDefault();

        if (newRating > 0 && newComment.trim() !== '') {
            const review = { rating: newRating, description: newComment, author: `${session?.user?.user_id}` };
            try {
                const response = await axios.post(`/api/recipes/${recipe._id}/reviews`, review);
                console.log('Review added successfully:', response.data); // Optional: Log the response data

                setReviews([...reviews, response.data.review]); // Update state with the review data from response
                setNewRating(0);
                setNewComment('');

            } catch (error) {
                console.error('Error adding review:', error);
                alert("Error happend while adding recipe")
                // Handle errors appropriately (e.g., display an error message to the user)
            }
        }
    };

    const handleDeleteReview = async (index) => {
        try {
            const reviewIdToDelete = reviews[index]._id; // Assuming your review objects have an _id field
            // Send Axios delete request to delete the review
            await axios.delete(`/api/recipes/${recipe._id}/reviews/${reviewIdToDelete}/?author_id=${reviews[index]?.author?._id}`);
            // Update the local state to remove the deleted review
            setReviews(reviews.filter((_, i) => i !== index));
        } catch (error) {
            console.error('Error deleting review:', error);
            // Handle error if needed
            alert("Error:", error)
        }
    };

    return (
        <div className="flex flex-col space-y-4">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="overflow-y-auto max-h-96 border border-gray-200 rounded-md p-4">
                {reviews.length === 0 && <p>No reviews yet.</p>}
                {reviews.map((review, index) => (
                    review?.author?._id === session?.user?.user_id ?
                        <Review
                            key={index}
                            rating={review?.rating}
                            comment={review?.description}
                            author={review?.author?.name}
                            onDelete={() => handleDeleteReview(index)}
                        />
                        :
                        <Review
                            key={index}
                            rating={review?.rating}
                            comment={review?.description}
                            author={review?.author?.name}
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