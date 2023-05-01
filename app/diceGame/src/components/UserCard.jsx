import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const UserCard = (props) => {
  const { name, score = 0 } = props;
  const location = useLocation();

  const [color, setColor] = useState(
    "#" + Math.floor(Math.random() * 16777215).toString(16)
  );

  const shouldDisplayScore = location.pathname.startsWith("/game/");

  return (
    <div className="userCard-container h-56 w-48 rounded-lg flex flex-col items-center justify-evenly text-white shadow-2xl p-4 pt-8">
      <div
        className="rounded-full"
        style={{
          backgroundColor: color,
          height: "50px",
          width: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          border: "2px solid white",
        }}
      >
        {name.charAt(0).toUpperCase()}
      </div>
      <p className="text-lg font-semibold">{name}</p>
      {shouldDisplayScore && <p className="score text-base">Score: {score}</p>}
    </div>
  );
};

export default UserCard;
