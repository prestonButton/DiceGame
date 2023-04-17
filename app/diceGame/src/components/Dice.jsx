import React from "react";
import PropTypes from "prop-types";

const Dice = ({ dots }) => {
  const dotPositions = {
    1: ["center"],
    2: ["top-left", "bottom-right"],
    3: ["top-left", "center", "bottom-right"],
    4: ["top-left", "top-right", "bottom-left", "bottom-right"],
    5: ["top-left", "top-right", "center", "bottom-left", "bottom-right"],
    6: [
      "top-left",
      "top-right",
      "mid-left",
      "mid-right",
      "bottom-left",
      "bottom-right",
    ],
  };

  return (
    <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center p-3">
      {dotPositions[dots].map((position) => (
        <span
          key={position}
          className={`w-3 h-3 bg-black rounded-full absolute ${
            position === "top-left" ? "top-3 left-3" : ""
          }
          ${position === "top-right" ? "top-3 right-3" : ""} ${
            position === "bottom-left" ? "bottom-3 left-3" : ""
          }
          ${position === "bottom-right" ? "bottom-3 right-3" : ""} ${
            position === "center" ? "self-center" : ""
          }
          ${position === "mid-left" ? "self-center left-3" : ""} ${
            position === "mid-right" ? "self-center right-3" : ""
          }`}
        ></span>
      ))}
    </div>
  );
};

Dice.propTypes = {
  dots: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
};

export default Dice;
