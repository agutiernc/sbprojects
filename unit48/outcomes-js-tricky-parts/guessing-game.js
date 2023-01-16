function guessingGame() {
  const randomNum = Math.floor(Math.random() * 100);
  let gameOver = false;
  let gameCount = 0;

  return function guess(num) {
    const count = gameCount === 1 ? 'guess' : 'guesses';

    if (gameOver) return "The game is over, you already won!";

    gameCount++;

    if (num === randomNum) {
      gameOver = true;

      return `You win! You found ${randomNum} in ${gameCount} ${count}.`
    } else if (num > randomNum) {
      return `${num} is too high!`
    } else {
      return `${num} is too low!`
    }
  }
}

module.exports = { guessingGame };

