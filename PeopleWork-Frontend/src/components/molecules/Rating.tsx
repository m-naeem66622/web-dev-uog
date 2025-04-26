
interface RatingProps {
  value: number; // Current rating value (e.g., 4.5)
  maxRating?: number; // Optional, default is 5 stars
}

export const Rating = ({ value, maxRating = 5 }: RatingProps) => {
  const filledStars = Math.floor(value); // Whole filled stars
  const hasHalfStar = value % 1 !== 0; // Check if there's a half-star
  const emptyStars = maxRating - Math.ceil(value); // Empty stars

  return (
    <div className="flex items-center">
      {/* Render full stars */}
      {Array.from({ length: filledStars }, (_, index) => (
        <svg
          key={`full-${index}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="yellow"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M12 17.27l6.18 3.73-1.64-7.03 5.45-4.73-7.19-.61L12 2 9.2 9.63l-7.19.61 5.45 4.73-1.64 7.03L12 17.27z"
            clipRule="evenodd"
          />
        </svg>
      ))}

      {/* Render half-star (if necessary) */}
      {hasHalfStar && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="yellow"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M12 17.27l6.18 3.73-1.64-7.03 5.45-4.73-7.19-.61L12 2 9.2 9.63l-7.19.61 5.45 4.73-1.64 7.03L12 17.27z"
            clipRule="evenodd"
          />
        </svg>
      )}

      {/* Render empty stars */}
      {Array.from({ length: emptyStars }, (_, index) => (
        <svg
          key={`empty-${index}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M12 17.27l6.18 3.73-1.64-7.03 5.45-4.73-7.19-.61L12 2 9.2 9.63l-7.19.61 5.45 4.73-1.64 7.03L12 17.27z"
            clipRule="evenodd"
          />
        </svg>
      ))}
    </div>
  );
};
