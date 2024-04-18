// Lista de palabras predefinidas
const words = ['javascript', 'ahorcado', 'computadora', 'tecnologia', 'programacion', 'internet'];

// Variables globales
let chosenWord = '';
let guessedLetters = [];
let attemptsLeft = 6;
const maxAttempts = 6;

// Inicializa el juego
function initGame() {
    chosenWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    attemptsLeft = maxAttempts;

    document.getElementById('word-display').innerHTML = getWordDisplay();
    document.getElementById('attempts-left').textContent = attemptsLeft;
    document.getElementById('result-message').innerHTML = '';
    document.getElementById('hangman-image').style.backgroundImage = `url('1.png')`;
    document.getElementById('guess-button').disabled = false;
    document.getElementById('letter-input').disabled = false;
}

// se ve cual era la palabra 
function getWordDisplay() {
    let display = '';
    for (const letter of chosenWord) {
        if (guessedLetters.includes(letter)) {
            display += letter + ' ';
        } else {
            display += '_ ';
        }
    }
    return display.trim();
}

// Maneja el evento de adivinar una letra
function handleGuess() {
    const input = document.getElementById('letter-input');
    const guessedLetter = input.value.toLowerCase().trim();

    if (guessedLetter && guessedLetter.length === 1 && /^[a-z]$/.test(guessedLetter)) {
        if (!guessedLetters.includes(guessedLetter)) {
            guessedLetters.push(guessedLetter);

            if (!chosenWord.includes(guessedLetter)) {
                attemptsLeft--;
            }
        }

        input.value = '';
        updateGame();
    }
}

function updateGame() {
    document.getElementById('word-display').innerHTML = getWordDisplay();
    document.getElementById('attempts-left').textContent = attemptsLeft;
    document.getElementById('hangman-image').style.backgroundImage = `url('hangman${6 - attemptsLeft}.png')`;
    if (attemptsLeft <= 0) {
        document.getElementById('result-message').innerHTML = `¡Perdiste! La palabra era "${chosenWord}".`;
        document.getElementById('guess-button').disabled = true;
        document.getElementById('letter-input').disabled = true;
    } else if (document.getElementById('word-display').textContent.replace(/ /g, '') === chosenWord) {
        document.getElementById('result-message').innerHTML = '¡Ganaste!';
        document.getElementById('guess-button').disabled = true;
        document.getElementById('letter-input').disabled = true;
    }
}
document.getElementById('hangman-image').style.backgroundImage = `url('imagenes/hangman1.png')`,`url('imagenes/hangman2.png')`,`url('imagenes/hangman3.png')`,`url('imagenes/hangman4.png')`,`url('imagenes/hangman5.png')`,`url('imagenes/hangman6.png')${6 - attemptsLeft}.png')`;
window.onload = function() {
    initGame();
    document.getElementById('guess-button').addEventListener('click', handleGuess);
    document.getElementById('reset-button').addEventListener('click', initGame);
};
