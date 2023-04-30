import React, { useRef } from "react";

function Modal({ show, onClose }) {
  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  if (!show) {
    return null;
  }

return (
  <div
    className="fixed inset-0 flex items-center justify-center z-50"
    onClick={handleClickOutside}
  >
    {/* Overlay */}
    <div className="fixed inset-0 bg-black opacity-50 backdrop-filter backdrop-blur-xl z-40"></div>

    {/* Modal */}
    <div
      ref={modalRef}
      className="bg-white rounded-lg w-4/5 md:w-3/5 lg:w-1/2 xl:w-2/5 shadow-lg z-50 h-3/5 flex flex-col"
    >
      <div className="relative p-4 flex justify-between items-center border-b border-gray-200">
        <h2 className="text-blue-500 font-bold text-lg">10,000 Game Rules</h2>
        <button
          className="text-red-500 text-xl absolute top-2 right-2 hover:bg-gray-200 w-6 h-6 flex items-center justify-center rounded-full focus:outline-none"
          onClick={onClose}
        >
          &times;
        </button>
      </div>

      {/* Content */}
      <div className="p-4 text-gray-800 overflow-y-auto h-full">
        {/* ... Rest of the content ... */}
        <div className="p-4 text-gray-800">
          <h3 className="font-bold text-lg">Objective</h3>
          <p>
            The objective of the game is to be the first player to reach a score
            of 10,000 points or more.
          </p>

          <h3 className="font-bold text-lg mt-4">Number of Players</h3>
          <p>2 - 6</p>

          <h3 className="font-bold text-lg mt-4">Gameplay</h3>
          <h4 className="font-bold text-base mt-2">Step 1: Rolling the Dice</h4>
          <p>
            Each player takes turns rolling all six dice. After every roll, the
            player must keep at least one scoring die.
          </p>

          <h4 className="font-bold text-base mt-2">Step 2: Scoring</h4>
          <p>Points are earned based on the numbers rolled:</p>
          <ul className="list-disc pl-5">
            <li>
              <strong>Single die:</strong>
              <ul className="list-disc pl-5">
                <li>1: 100 points</li>
                <li>5: 50 points</li>
              </ul>
            </li>
            <li>
              <strong>Three of a Kind:</strong>
              <ul className="list-disc pl-5">
                <li>1's: 1,000 points</li>
                <li>2's: 200 points</li>
                <li>3's: 300 points</li>
                <li>4's: 400 points</li>
                <li>5's: 500 points</li>
                <li>6's: 600 points</li>
              </ul>
            </li>
            <li>
              <strong>Additional die of a three of a kind:</strong> Adds the
              three of a kind value
            </li>
            <li>
              <strong>Straight (1-2-3-4-5-6):</strong> 1000 points
            </li>
            <li>
              <strong>Three Pairs:</strong> 1000 points
            </li>
          </ul>

          <h4 className="font-bold text-base mt-2">Step 3: Continuing Play</h4>
          <p>
            After setting aside at least one scoring die, the player may choose
            to continue rolling the remaining dice to accumulate more points or
            end their turn and keep the points.
          </p>
          <p>
            <strong>Farkle:</strong> If a player rolls the dice and no scoring
            combinations are achieved, the player has "Farkled" and will lose
            all points accumulated during that turn. Their turn ends and play
            moves to the next player.
          </p>

          <h4 className="font-bold text-base mt-2">
            Step 4: Reaching 10,000 Points
          </h4>
          <p>
            Once a player reaches 10,000 points, all other players have one last
            opportunity to take a turn and try to beat the leading player's
            score.
          </p>

          <h3 className="font-bold text-lg mt-4">Winning</h3>
          <p>
            The player with the highest score equal to or above 10,000 points at
            the end of the final round is declared the winner.
          </p>
        </div>
      </div>
    </div>
  </div>
);
}

export default Modal;


/*       */