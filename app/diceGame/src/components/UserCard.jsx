import React from "react";
//impleent Add/Remove button functionality here

const UserCard = () => {
  const name = 'Hugh Jackman' //this will eventually become an API call/get this data from MongoDB
  return (
    <div className="userCard-container h-56 w-48 rounded-lg flex flex-col items-center justify-evenly text-white p-4 shadow-2xl pt-8">
      <div className="rounded-full bg-purple-500 h-12 w-12 flex items-center justify-center">
        {name.charAt(0).toUpperCase()}
      </div>
      <p className="text-lg  font-semibold ">{name}</p>
    </div>
  );
};

export default UserCard;
