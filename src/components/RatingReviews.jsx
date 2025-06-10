import React, { useState } from "react";

const RatingReviews = ({ reviews, showForm, setShowForm }) => {
  const [newReview, setNewReview] = useState({ user: "", comment: "", rating: 5 });
  const [localReviews, setLocalReviews] = useState(reviews);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.user || !newReview.comment) return;
    setLocalReviews([...localReviews, newReview]);
    setNewReview({ user: "", comment: "", rating: 5 });
    setShowForm(false);
  };

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Ratings & Reviews</h2>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg shadow mb-8">
          <h3 className="text-lg font-semibold mb-4">Leave a Review</h3>
          <input
            type="text"
            className="w-full mb-3 p-2 border border-gray-300 rounded"
            placeholder="Your Name"
            value={newReview.user}
            onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
            required
          />
          <textarea
            className="w-full mb-3 p-2 border border-gray-300 rounded"
            placeholder="Write your thoughts..."
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            required
          />
          <select
            className="mb-3 p-2 border rounded"
            value={newReview.rating}
            onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
          >
            {[5, 4, 3, 2, 1].map((star) => (
              <option key={star} value={star}>{star} Star{star > 1 ? "s" : ""}</option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded font-semibold hover:bg-pink-700 transition"
          >
            Submit Review
          </button>
        </form>
      )}

      {localReviews.length === 0 && (
        <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
      )}

      {localReviews.map((review, index) => (
        <div key={index} className="mb-6 border-b pb-4">
          <div className="flex justify-between items-center mb-1">
            <p className="font-semibold text-gray-800">{review.user}</p>
            <span className="text-yellow-500 text-lg">{'⭐'.repeat(review.rating)}</span>
          </div>
          <p className="text-sm text-gray-700">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default RatingReviews;
