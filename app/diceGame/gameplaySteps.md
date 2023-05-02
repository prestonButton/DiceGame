# Game Play Steps

## Initial Game state
- [X] 2 - 6 players, user cards are displayed, each with a score initialized to 0.
- [X] 6 dice, initialized to 1
- [X] first player in game.players is the current player
  - [ ] this is indicated by a border around that players user card. there is also a turn score displayed below their score on their userCard
  - [ ] the roll dice button and hold dice button are only displayed for the active user

## Game Play
- [x] active user clicks the roll dice button, and the dice are updated with the new values
- [X] if the dice can score, the active user is able to click the dice themselves to hold them. that score is added to the turn score
  - [ ] if they click the same dice again, the score is removed from the turn score. 
  - [ ] the trn score is updated in the user card
- [ ] the current player keeps playing until they either
  - [ ] roll the dice and get no scoring dice
    - [ ] in this case, their turn score is not added to their score, and the next player becomes the current player
  - [ ] click the hold dice button
    - [ ] in this case, the turn score is added to their score, and the next player becomes the current player

## End Game
- [ ] when a player reaches 10000 points, the game is over
- [ ] declare that player the winner and display a button to start a new game


