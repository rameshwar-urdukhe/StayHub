const ReviewList = ({ reviews }) => {
  return (
    <div className="w-full space-y-6">
      {/* Header Stat Counter */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <h3 className="text-lg font-bold tracking-tight text-white">
          Community Feedback
        </h3>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-surface border border-white/5 text-brand-accent">
          {reviews?.length || 0} {reviews?.length === 1 ? "Review" : "Reviews"}
        </span>
      </div>

      {/* Conditional Layout Engine */}
      {reviews?.length === 0 ? (
        <div className="text-center py-8 rounded-2xl bg-brand-dark/30 border border-dashed border-white/5">
          <span className="text-2xl opacity-60 block mb-2">💬</span>
          <p className="text-sm text-brand-muted">
            No reviews have been written for this stay yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews?.map((review) => (
            <div
              key={review._id}
              className="bg-brand-dark/40 border border-white/5 rounded-2xl p-5 space-y-4 transition-all duration-200 hover:border-white/10"
            >
              {/* User Identity Profile Block */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-brand-accent/20 to-brand-highlight/20 border border-white/10 flex items-center justify-center text-brand-accent font-bold text-sm shadow-inner">
                    {review.user?.name
                      ? review.user.name[0].toUpperCase()
                      : "U"}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-slate-200 truncate">
                      {review.user?.name || "Anonymous Traveler"}
                    </h4>
                    <p className="text-[11px] text-brand-muted font-medium mt-0.5">
                      Verified Guest
                    </p>
                  </div>
                </div>

                {/* Score Index Ribbon */}
                <div className="flex items-center bg-brand-surface px-2.5 py-1 rounded-lg border border-white/5 text-xs text-amber-400 font-bold tracking-wide shadow-sm">
                  <span className="mr-1">{review.rating}.0</span>
                  <span className="text-[10px] tracking-tight">
                    {"★".repeat(review.rating)}
                  </span>
                </div>
              </div>

              {/* Review Text Commentary */}
              <p className="text-sm text-brand-muted leading-relaxed font-normal whitespace-pre-line break-words">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;
