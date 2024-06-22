// script.js

const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restartButton');
const computerModeButton = document.getElementById('computerMode');
const twoPlayersModeButton = document.getElementById('twoPlayersMode');

let currentPlayer = 'X';
let gameBoard = Array(9).fill(null);
let isVsComputer = false;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

restartButton.addEventListener('click', restartGame);
computerModeButton.addEventListener('click', () => startGame(true));
twoPlayersModeButton.addEventListener('click', () => startGame(false));

function startGame(vsComputer) {
    isVsComputer = vsComputer;
    restartGame();
    message.textContent = `Player X's turn`;
    restartButton.disabled = false;
    board.classList.add('active', 'visible');
}

function handleClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (gameBoard[index] || checkWinner() || !board.classList.contains('active')) {
        return;
    }

    gameBoard[index] = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    if (checkWinner()) {
        message.textContent = `Player ${currentPlayer} wins!`;
        board.classList.remove('active');
        return;
    }

    if (gameBoard.every(cell => cell)) {
        message.textContent = "It's a tie!";
        board.classList.remove('active');
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;

    if (isVsComputer && currentPlayer === 'O') {
        setTimeout(aiMove, 500); // Delay AI move for better UX
    }
}

function aiMove() {
    let moveIndex = findWinningMove();

    if (moveIndex === -1) {
        moveIndex = findBlockingMove();
    }

    if (moveIndex === -1) {
        let availableCells = gameBoard.map((val, index) => val === null ? index : null).filter(val => val !== null);
        moveIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    }

    gameBoard[moveIndex] = currentPlayer;
    cells[moveIndex].classList.add(currentPlayer.toLowerCase());

    if (checkWinner()) {
        message.textContent = `Player ${currentPlayer} wins!`;
        board.classList.remove('active');
        return;
    }

    if (gameBoard.every(cell => cell)) {
        message.textContent = "It's a tie!";
        board.classList.remove('active');
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
}

function findWinningMove() {
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] === null) {
            gameBoard[i] = currentPlayer;
            if (checkWinner()) {
                gameBoard[i] = null;
                return i;
            }
            gameBoard[i] = null;
        }
    }
    return -1;
}

function findBlockingMove() {
    let opponentSymbol = currentPlayer === 'X' ? 'O' : 'X';
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] === null) {
            gameBoard[i] = opponentSymbol;
            if (checkWinner()) {
                gameBoard[i] = null;
                return i;
            }
            gameBoard[i] = null;
        }
    }
    return -1;
}

function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function restartGame() {
    gameBoard.fill(null);
    cells.forEach(cell => {
        cell.className = 'cell flex items-center justify-center bg-white text-3xl font-bold rounded-lg shadow-lg hover:shadow-2xl transform transition-transform duration-300 hover:scale-105';
    });
    currentPlayer = 'X';
    message.textContent = "Player X's turn";
    board.classList.add('active', 'visible');
}
