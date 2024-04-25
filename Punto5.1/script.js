// Variables globales
let board = ['', '', '', '', '', '', '', '', '']; // Estado del tablero
let currentPlayer = 'X'; // Jugador actual
let gameActive = true; // Estado del juego

// Referencias al DOM
const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('reset-button');

// Función para inicializar el juego
function initGame() {
    // Reiniciar el tablero
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    messageElement.textContent = `Es el turno del jugador ${currentPlayer}`;

    // Limpia el tablero existente
    boardElement.innerHTML = '';

    // Genera el tablero
    for (let i = 0; i < board.length; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        boardElement.appendChild(cell);
    }
}

// Función que maneja el clic en una celda
function handleCellClick(event) {
    const cellIndex = event.target.dataset.index;

    if (board[cellIndex] === '' && gameActive) {
        board[cellIndex] = currentPlayer;
        event.target.textContent = currentPlayer;

        // Comprobar si hay un ganador
        const winner = checkWinner();
        if (winner) {
            messageElement.textContent = `¡El jugador ${winner} gana!`;
            gameActive = false;
        } else if (board.every(cell => cell !== '')) {
            messageElement.textContent = '¡Empate!';
            gameActive = false;
        } else {
            // Cambiar de jugador
            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
            messageElement.textContent = `Es el turno del jugador ${currentPlayer}`;
        }
    }
}

// Función para comprobar si hay un ganador
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], // Fila 1
        [3, 4, 5], // Fila 2
        [6, 7, 8], // Fila 3
        [0, 3, 6], // Columna 1
        [1, 4, 7], // Columna 2
        [2, 5, 8], // Columna 3
        [0, 4, 8], // Diagonal principal
        [2, 4, 6]  // Diagonal inversa
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[c] === board[b]) {
            return board[a];
        }
    }

    return null;
}

// Añadir un evento de clic al botón de reiniciar
resetButton.addEventListener('click', initGame);

// Inicializar el juego al cargar la página
window.onload = initGame;
