
// Tic-Tac-Doh JavaScript Code

const board = document.getElementById('board');
const bumpButton = document.getElementById('bumpButton');
const winsElement = document.getElementById('wins');
const lossesElement = document.getElementById('losses');
const drawsElement = document.getElementById('draws');
const messageElement = document.getElementById('message');

// References to the modal, modal message, and modal close button
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');
const modalClose = document.getElementById('modal-close');

// Icons
const xIcon = '<img src="images/x.svg" alt="X Icon" style="width: 100%; height: 100%;">';
const oIcon = '<img src="images/o.svg" alt="O Icon" style="width: 100%; height: 100%;">';
const dohIcon = '<img src="images/doh.svg" alt="O Icon" style="width: 100%; height: 100%;">';

// Game state variables
let gameState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;

// Bump variables
let bumpUses = 2;
let bumpState = false;
let aiBumpUses = 2;

// Scores for minimax algorithm
const scores = {
  'X': -10,
  'O': 10,
  'draw': 0
};

// Add an event listener to the close button
modalClose.addEventListener('click', function () {
  modal.classList.add('hidden');
  resetGame();
});

// Add an event listener to the bump button
bumpButton.addEventListener('click', () => {
  if (bumpUses > 0 && !gameOver && !bumpState) {
    bumpState = true;
    bumpUses--;
    bumpButton.textContent = `Bump (${bumpUses} left)`;
  }
});

// Initialize board
for (let i = 0; i < 9; i++) {
  let cell = document.createElement('div');
  cell.classList.add('cell');
  cell.addEventListener('click', () => playerMove(i));
  board.appendChild(cell);
}

function playerMove(index) {
  if (gameState[index] === '' && !gameOver) { // Check if the cell is empty and the game is not over
    if (aiBumpUses > 0 && !gameOver && Math.random() > 0.5) { // 50% chance of AI bumping
      aiBumpUses--;
      gameState[index] = 'Doh';
      setTimeout(() => {  // Wait 1 second to display the 'Doh' icon before moving it
        updateBoard(); 
        let index2 = Math.floor(Math.random() * 9); // find a random empty cell
        while (gameState[index2] !== '') {
          index2 = Math.floor(Math.random() * 9);
        }
        gameState[index2] = 'X';
        gameState[index] = ''; // Reset the 'Doh' spot
        setTimeout(() => { // Wait 1 second to display the 'X' icon
          updateBoard();
          checkWinner();
          setTimeout(() => { // Wait 1 second before AI moves
            if (!gameOver) {
              aiMove();
              updateBoard();
              checkWinner();
            }
          }, 500);
        }, 500);
      }, 500);
    } else {
      gameState[index] = 'X';
      updateBoard();
      checkWinner();
      if (!gameOver) {
        aiMove();
        updateBoard();
        checkWinner();
      }
    }
    bumpState = false;
  }
}

// This function determines the AI's best move using the minimax algorithm.
// It iterates over each cell, simulating an 'O' move in empty spots and calling minimax to calculate the move's score.
// The highest-scoring move is then executed by the AI as its actual move on the game board.
function minimax(localGameState, depth, isMaximizing) {
  let winner = getWinner(localGameState);
  if (winner !== null) {
    return scores[winner];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (localGameState[i] === '') {
        localGameState[i] = 'O';
        let score = minimax(localGameState, depth + 1, false);
        localGameState[i] = '';
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (localGameState[i] === '') {
        localGameState[i] = 'X';
        let score = minimax(localGameState, depth + 1, true);
        localGameState[i] = '';
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

// This function is called when it's the AI's turn to move.
function aiMove() {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 9; i++) {
    if (gameState[i] === '') {
      gameState[i] = 'O';
      let score = minimax(gameState, 0, false);
      gameState[i] = '';
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  // If bumpState is active, make a recursive call to find the next best move.
  if (bumpState) {
    gameState[move] = 'Doh'; // Temporarily set the best move to Doh'
    bumpState = false; // Prevent infinite recursion
    updateBoard(); // Reflect changes on the UI
    setTimeout(() => {
      aiMove(); // Recursive call
      gameState[move] = ''; // Reset the 'Doh' spot after the recursive call
      updateBoard(); // Reflect changes on the UI
    }, 1000);

  } else {
    gameState[move] = 'O'; // Set the chosen move to 'O'
    updateBoard(); // Reflect changes on the UI
    checkWinner(); // Check for a winner
  }
}

// This function updates the game board based on the current game state.
function updateBoard() {
  let cells = document.querySelectorAll('.cell');
  cells.forEach((cell, i) => {
    if (gameState[i]) {
      if (gameState[i] === 'X') {
        cell.innerHTML = xIcon;
        cell.classList.add('X');
      } else if (gameState[i] === 'O') {
        cell.innerHTML = oIcon;
      } else if (gameState[i] === 'Doh') {
        cell.innerHTML = dohIcon;
      }
      cell.classList.add('taken');
    } else {
      cell.textContent = '';
      cell.classList.remove('taken');
    }
  });
}

function getWinner(gameState) {
  const winCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  for (const combination of winCombinations) {
    const [a, b, c] = combination;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      return gameState[a]; // Returns 'X' or 'O'
    }
  }
  // Check for draw
  if (!gameState.includes('') && !gameState.includes('Doh')) {
    return 'draw'; // All cells are filled and no winner, it's a draw
  }

  return null; // No winner
}


function checkWinner() {
  const winner = getWinner(gameState);

  if (winner) {
    gameOver = true;
    if (winner === 'X') {
      winsElement.textContent = parseInt(winsElement.textContent) + 1;
      showModal('You win!');
    } else if (winner === 'O') {
      lossesElement.textContent = parseInt(lossesElement.textContent) + 1;
      showModal('You lose!');
    } else if (winner === 'draw') {
      drawsElement.textContent = parseInt(drawsElement.textContent) + 1;
      showModal('It\'s a draw!');
    }
  }
}

// Reset the game state and UI
function resetGame() {
  gameState.fill('');
  gameOver = false;
  bumpUses = 2;
  aiBumpUses = 2;
  bumpButton.textContent = `Bump (2 left)`;
  updateBoard();
}

// Create a function to show the modal with a specific message
function showModal(message) {
  modalMessage.textContent = message;
  modal.classList.remove('hidden');
}
