import StarIcon from "./icons/StarIcon";
import "../styles/components/Rating.scss";
import { useEffect, useState } from "react";

const DEFAULT_STARS = 6;

export default function Rating({ stars, amount, onRating, isActive }) {
  const [isActiveNow, setActiveNow] = useState(false);

  useEffect(() => {
    setActiveNow(isActive);
  }, [isActive]);

  const renderFillStars = () => {
    let fillStars = stars;
    const fillStarCpns = [];

    while (fillStars > 0) {
      fillStarCpns.push(
        <StarIcon
          className={"star-icon--fill"}
          size={20}
          key={`fill-${fillStars}`}
        />,
      );
      fillStars--;
    }

    return fillStarCpns;
  };

  const renderEmptyStars = () => {
    let emptyStars = DEFAULT_STARS - stars;
    const emptyStarCpns = [];

    while (emptyStars > 0) {
      emptyStarCpns.push(
        <StarIcon
          className={"star-icon--empty"}
          size={20}
          key={`empty-${emptyStars}`}
        />,
      );
      emptyStars--;
    }

    return emptyStarCpns;
  };

  const handleClick = () => {
    setActiveNow(!isActiveNow);
    if (!isActiveNow) {
      onRating(stars);
    } else {
      onRating(null);
    }
  };

  return (
    <div
      className={`rating ${isActiveNow ? "rating--active" : ""}`}
      onClick={handleClick}
    >
      {renderFillStars()}
      {renderEmptyStars()}
      <span className="rating__amount">{amount}</span>
    </div>
  );
}
