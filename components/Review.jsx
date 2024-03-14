import React from 'react';

const Review = ({ rating, comment, author, onDelete }) => (
    <div className="flex items-center mb-4 border-b border-gray-200 pb-2">
        <div className="mr-4">
            <p className="text-xl font-bold">{rating}</p>
        </div>
        <div className="flex-grow">
            <p className="text-gray-700">{comment}</p>
            {author && (
                <p className="text-sm text-gray-500 mt-1">By: {author}</p>
            )}
        </div>
        {onDelete && (
            <button
                className="text-red-500 hover:text-red-700 focus:outline-none ml-4"
                onClick={onDelete}
            >
                Delete
            </button>
        )}
    </div>
);

export default Review;