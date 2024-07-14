let currentPlayer = 'X';
let board = new Array(9).fill('');
let gameOver = false;

function makeMove(cellIndex) {
    if (board[cellIndex] === '' && !gameOver) {
        board[cellIndex] = currentPlayer;
        const cell = document.querySelector('.cell:nth-child(' + (cellIndex + 1) + ')');
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);

        if (isGameWon()) {
            document.getElementById('popup').style.display = 'block';
            document.getElementById('popup-message').textContent = `Player ${currentPlayer} wins!`;
            document.getElementById('popup-button').textContent = 'Play Again';
            gameOver = true;
        } else if (board.every(cell => cell !== '')) {
            document.getElementById('popup').style.display = 'block';
            document.getElementById('popup-message').textContent = 'Match Tie! Try again.';
            document.getElementById('popup-button').textContent = 'Play Again';
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.getElementById('message').textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function isGameWon() {
    const winCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return winCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] !== '' && board[a] === board[b] && board[a] === board[c];
    });
}

function resetBoard() {
    board = new Array(9).fill('');
    currentPlayer = 'X';
    gameOver = false;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
    document.getElementById('popup').style.display = 'none';
    document.getElementById('message').textContent = `Player X's turn`;
}

document.querySelectorAll('.cell').forEach((cell, index) => {
    cell.addEventListener('click', () => makeMove(index));
});

document.getElementById('popup-button').addEventListener('click', resetBoard);
