import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const Rating = ({ value, onChange }) => {
    const [rating, setRating] = useState(value);

    const handleClick = (newValue) => {
        setRating(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <div>
            {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                    <FaStar
                        key={index}
                        className="star"
                        color={ratingValue <= rating ? '#ffc107' : '#e4e5e9'}
                        size={20}
                        onClick={() => handleClick(ratingValue)}
                    />
                );
            })}
        </div>
    );
};

export default Rating;
