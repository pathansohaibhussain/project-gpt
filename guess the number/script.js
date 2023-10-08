let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

const guessInput = document.getElementById('guess');
const checkBtn = document.getElementById('check-btn');
const message = document.getElementById('message');
const retryBtn = document.getElementById('retry-btn');

checkBtn.addEventListener('click', () => {
    attempts++;
    const userGuess = parseInt(guessInput.value);

    if (isNaN(userGuess)) {
        showMessage('Please enter a valid number.', 'red');
    } else if (userGuess === secretNumber) {
        showMessage(`Congratulations! You guessed the number in ${attempts} attempts.`, 'green');
        guessInput.disabled = true;
        checkBtn.disabled = true;
    } else if (userGuess > secretNumber) {
        showMessage('Try a lower number.', 'blue');
    } else {
        showMessage('Try a higher number.', 'blue');
    }
});

retryBtn.addEventListener('click', () => {
    resetGame();
});

function showMessage(text, color) {
    message.textContent = text;
    message.style.color = color;
}

function resetGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    guessInput.value = '';
    guessInput.disabled = false;
    checkBtn.disabled = false;
    message.textContent = '';
}

// Initial message
showMessage('Guess a number between 1 and 100.', 'black');
