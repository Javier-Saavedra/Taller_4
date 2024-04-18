var board = Array(9).fill(null);
var currentPlayer = 'X';

function drawBoard() {
    var boardDiv = document.getElementById('board');
    boardDiv.innerHTML = '';
    for (var i = 0; i < 9; i++) {
        boardDiv.innerHTML += `<div class="cell" onclick="makeMove(${i})">${board[i] ? board[i] : ''}</div>`;
    }
}

function makeMove(i) {
    if (!board[i]) {
        board[i] = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        drawBoard();
        if (checkWin()) {
            alert('Ganador: ' + board[i]);
            resetBoard();
        }
    }
}

function checkWin() {
    var lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (var line of lines) {
        if (board[line[0]] && board[line[0]] === board[line[1]] && board[line[0]] === board[line[2]]) {
            return true;
        }
    }
    return false;
}

function resetBoard() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    drawBoard();
}

drawBoard();
