import React from "react";
import PropTypes from "prop-types";

const Dice = ({ dots, score }) => {
  const dotPositions = {
    1: [5],
    2: [1, 9],
    3: [1, 5, 9],
    4: [1, 3, 7, 9],
    5: [1, 3, 5, 7, 9],
    6: [1, 3, 4, 6, 7, 9],
  };

  return (
    <div className="w-20 h-20">
      <div
        // if scored = true, add bg-green-500, else add bg-white
        className={`w-full h-full rounded-lg border border-black grid grid-cols-3 grid-rows-3 gap-1 p-3 ${scored ? bg-green-500 : bg-white}`}
        >
        {[...Array(9)].map((_, idx) => (
          <div key={idx} className="flex items-center justify-center">
            {dotPositions[dots].includes(idx + 1) && (
              <span className="w-3 h-3 bg-black rounded-full"></span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

Dice.propTypes = {
  dots: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
};

export default Dice;
