let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function makeMove(cellIndex) {
    if (gameBoard[cellIndex] === '' && gameActive) {
        gameBoard[cellIndex] = currentPlayer;
        document.getElementsByClassName('cell')[cellIndex].textContent = currentPlayer;
        gameActive = !checkWin();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        if (gameActive) {
            document.getElementById('current-player').textContent = currentPlayer;
        }
    }
}

function checkWin() {
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

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            document.getElementById('message').innerHTML = `Player <span id="current-player">${currentPlayer}</span> wins!`;
            return true;
        }
    }

    if (!gameBoard.includes('')) {
        document.getElementById('message').textContent = 'It\'s a draw!';
        return true;
    }

    return false;
}



function resetBoard() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    document.getElementById('message').innerHTML = `Player <span id="current-player">${currentPlayer}</span>'s turn`;
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
}

