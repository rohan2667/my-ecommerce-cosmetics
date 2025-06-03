const RatingReviews = ({ reviews }) => {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Ratings & Reviews</h2>
      {reviews.map((review, index) => (
        <div key={index} className="mb-4 border-b pb-3">
          <div className="flex justify-between items-center">
            <p className="font-semibold">{review.user}</p>
            <span className="text-yellow-500">{'⭐'.repeat(review.rating)}</span>
          </div>
          <p className="text-sm text-gray-700 mt-1">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default RatingReviews;
