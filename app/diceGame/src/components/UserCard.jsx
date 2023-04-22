import React from "react";

const UserCard = (props) => {
  const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

  return (
    <div className="userCard-container h-56 w-48 rounded-lg flex flex-col items-center justify-evenly text-white p-4 shadow-2xl pt-8">
      <div
        className="rounded-full"
        style={{
          backgroundColor: randomColor,
          height: "50px",
          width: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
        }}
      >
        {props.name.charAt(0).toUpperCase()}
      </div>
      <p className="text-lg font-semibold">{props.name}</p>
    </div>
  );
};

export default UserCard;
