const calculateScore = (dice) => {
  let score = 0;
  const diceCounts = Array(7).fill(0);

  for (const die of dice) {
    diceCounts[die]++;
  }

  // Check for three pairs
  if (diceCounts.slice(1).filter(count => count === 2).length === 3) {
    return 1000;
  }

  // Check for a straight
  if (diceCounts.slice(1).every(count => count === 1)) {
    return 1000;
  }

  // Calculate the score for single die and three of a kind
  for (let i = 1; i <= 6; i++) {
    const count = diceCounts[i];
    if (count >= 3) {
      score += i === 1 ? 1000 : i * 100;
      score += (count - 3) * (i === 1 ? 1000 : i * 100);
    } else {
      if (i === 1) score += count * 100;
      if (i === 5) score += count * 50;
    }
  }

  return score;
};

// Example usage
const diceRolls = [1, 2, 3, 3, 3, 5];
const score = calculateScore(diceRolls);
console.log(`Score for dice rolls [${diceRolls}] is ${score}`);
