const ReviewList = ({ reviews }) => {
   
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>

      {reviews?.length === 0 ? (
        <p>No Reviews Yet</p>
      ) : (
        reviews?.map((review) => (
          <div key={review._id} className="border rounded p-4 mb-4">
            <h3 className="font-semibold">{review.user?.name}</h3>

            <p>{"⭐".repeat(review.rating)}</p>

            <p>{review.comment}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;
