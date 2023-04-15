import React from "react";

const UserCard = ({ isFriend }) => {
  return (
    <div className="userCard-container h-56 w-48 rounded-lg flex flex-col items-center justify-evenly text-white p-4 shadow-2xl pt-8">
      <div className="rounded-full bg-purple-500 h-12 w-12 flex items-center justify-center">
        H
      </div>
      <p className="text-lg  font-semibold ">Hugh Jackman</p>
      {isFriend ? (
        <button className="text-xs m-2 py-1 px-4 bg-white text-blue-600 font-semibold rounded-md flex items-center gap-1">
          <span className="text-xl">-</span> Remove Friend
        </button>
      ) : (
        <button className="text-xs m-2 py-2 px-4 bg-white text-blue-600 font-semibold rounded-md">
          <span className="text-xl">+</span> Add Friend
        </button>
      )}
    </div>
  );
};

export default UserCard;
