import React from "react";
import '../tailwind.css'
import UserCard from '../components/UserCard';

const Lobby = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-wrap justify-center">
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Begin Game</button>
    </div>
  );
};

export default Lobby;



