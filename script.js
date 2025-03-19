let player
let player1Symbol = 'X';
let player2Symbol = 'O';
let currentPlayer = player1Symbol;
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let vsAI = false;

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

const messageElement = document.getElementById('winMessage');
const winPopup = document.getElementById('winPopup');

document.addEventListener('DOMContentLoaded', function() {
  showSymbolSelectionPopup();
});

function handleMove(index) {
  if (gameActive && board[index] === '') {
    board[index] = currentPlayer;
    renderBoard();
    if (checkWin()) {
      const winner = currentPlayer === player1Symbol ? 'Player 1 (X)' : 'Player 2 (O)';
      messageElement.textContent = `${winner} wins!`;
      winPopup.style.display = 'block';
      gameActive = false;
    } else if (checkDraw()) {
      messageElement.textContent = 'It\'s a draw!';
      winPopup.style.display = 'block';
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === player1Symbol ? player2Symbol : player1Symbol;
      if (vsAI && currentPlayer === player2Symbol) {
        setTimeout(() => {
          makeAIMove();
        }, 500); // Delay for AI move
      }
    }
  }
}

function makeAIMove() {
  // Simple AI logic: Randomly select an empty cell
  let emptyCells = [];
  board.forEach((cell, index) => {
    if (cell === '') {
      emptyCells.push(index);
    }
  });
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  handleMove(emptyCells[randomIndex]);
}

function renderBoard() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell, index) => {
    cell.textContent = board[index];
  });
}

function checkWin() {
  return winningCombos.some(combination => {
    return combination.every(index => {
      return board[index] === currentPlayer;
    });
  });
}

function checkDraw() {
  return board.every(cell => cell !== '');
}

function resetGame() {
  currentPlayer = player1Symbol;
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  winPopup.style.display = 'none';
  renderBoard();
}

function restartGame() {
  resetGame();
  showSymbolSelectionPopup();
}

function closeSymbolSelectionPopup() {
  const symbolSelectionPopup = document.getElementById('symbolSelectionPopup');
  symbolSelectionPopup.style.display = 'none';
}

function showSymbolSelectionPopup() {
  const symbolSelectionPopup = document.getElementById('symbolSelectionPopup');
  symbolSelectionPopup.style.display = 'block';
}

function startGame() {
  const selectedOpponent = document.querySelector('input[name="opponent"]:checked').value;
  if (selectedOpponent === "ai") {
    vsAI = true;
  } else {
    vsAI = false;
  }
  closeSymbolSelectionPopup();
}

// Symbol selection
document.getElementById('symbolX').addEventListener('change', function() {
  player1Symbol = 'X';
  player2Symbol = 'O';
});

document.getElementById('symbolO').addEventListener('change', function() {
  player1Symbol = 'O';
  player2Symbol = 'X';
});
