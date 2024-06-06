import React from 'react';

const ReviewStats = ({ positiveReviews, negativeReviews }) => {
    // Calculate the percentage of positive reviews
    const totalReviews = positiveReviews + negativeReviews;
    const positivePercentage = totalReviews === 0 ? 0 : (positiveReviews / totalReviews) * 100;
    const negativePercentage = totalReviews === 0 ? 0 : 100 - positivePercentage;

    return (
        <div>
            <h5>Review Stats</h5>
            {totalReviews === 0 ? (
                <div className="alert alert-warning" role="alert">
                    No genuine reviews posted yet
                </div>
            ) : (
                <div className="progress">
                    <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: `${positivePercentage}%` }}
                        aria-valuenow={positivePercentage}
                        aria-valuemin="0"
                        aria-valuemax="100"
                    >
                        Positive Reviews: {positivePercentage.toFixed(2)}%
                    </div>
                    <div
                        className="progress-bar bg-danger"
                        role="progressbar"
                        style={{ width: `${negativePercentage}%` }}
                        aria-valuenow={negativePercentage}
                        aria-valuemin="0"
                        aria-valuemax="100"
                    >
                        Negative Reviews: {negativePercentage.toFixed(2)}%
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewStats;
