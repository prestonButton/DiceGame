function createGame(playerIds) {
  return {
    playerId,
    playerIds,
    currentRoll: 0,
    currentScore: 0,
    totalScore: 0,
    currentPlayerIndex: 0,
    dice: [],
    gameOver: false,
  };
}

function rollDice(gameState) {
  if (gameState.gameOver) return gameState;

  // Generate random number between 1 and 6
  const dieResult = Math.floor(Math.random() * 6) + 1;

  // Update currentRoll and currentScore based on dieResult
  if (dieResult === 1) {
    gameState.currentRoll = 0;
    gameState.currentScore = 0;
    gameState.currentPlayerIndex =
      (gameState.currentPlayerIndex + 1) % gameState.playerIds.length;
  } else {
    gameState.currentRoll += 1;
    gameState.currentScore += dieResult;
  }

  // Add new dieResult to dice array
  gameState.dice.push(dieResult);

  // Update game state when current player reaches winning score
  if (gameState.totalScore + gameState.currentScore >= gameState.winningScore) {
    gameState.currentPlayerIndex = gameState.playerIds.indexOf(
      gameState.playerId
    );
    gameState.totalScore += gameState.currentScore;
    gameState.currentScore = 0;
    gameState.currentRoll = 0;
    gameState.gameOver = true;
  }

  return gameState;
}

export { createGame, rollDice };
