
import { Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface RatingStarsProps {
  issueId: string;
  onRate?: (issueId: string, rating: number) => void;
}

export function RatingStars({ issueId, onRate }: RatingStarsProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  const handleRate = (selectedRating: number) => {
    setRating(selectedRating);
    onRate?.(issueId, selectedRating);
    
    toast("Thanks for your feedback!", {
      description: "Your rating helps improve our match recommendations.",
      duration: 3000,
    });
  };

  return (
    <div className="flex items-center gap-1 mt-2">
      <span className="text-xs text-muted-foreground mr-2">
        Rate this match:
      </span>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRate(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            className="focus:outline-none"
          >
            <Star
              className={`h-4 w-4 transition-all ${
                star <= (hoveredRating || rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground/40"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
