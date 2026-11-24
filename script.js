// Variabilele jocului
let score = 0;
let timeLeft = 30;
let gameInterval;
let countdownInterval;
const board = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('start-btn');

// Creăm elementul "țintă" (căsuța) o singură dată
const target = document.createElement('div');
target.id = 'target';
board.appendChild(target);

// Funcția care mută căsuța într-o poziție aleatorie
function moveTarget() {
    // Calculăm poziția maximă pentru a nu ieși din board
    const maxX = board.clientWidth - 60; // 60 este lățimea căsuței
    const maxY = board.clientHeight - 60; // 60 este înălțimea căsuței

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    target.style.left = randomX + 'px';
    target.style.top = randomY + 'px';
}

// Funcția care pornește jocul
function startGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;
    startBtn.disabled = true;
    target.style.display = 'block'; // Arătăm căsuța
    
    moveTarget(); // Mutăm căsuța prima dată

    // Setăm un timer pentru a muta căsuța la fiecare 1 secundă (1000 ms)
    // Poți modifica 1000 în 800 pentru a fi mai greu
    gameInterval = setInterval(moveTarget, 1000); 

    // Setăm timer-ul pentru numărătoarea inversă
    countdownInterval = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

// Funcția care oprește jocul
function endGame() {
    clearInterval(gameInterval);
    clearInterval(countdownInterval);
    target.style.display = 'none'; // Ascundem căsuța
    startBtn.disabled = false;
    startBtn.textContent = 'Joacă din nou';
    alert(`Joc terminat! Scorul tău este: ${score}`);
}

// Când dai click pe căsuță
target.addEventListener('click', () => {
    if (timeLeft > 0) {
        score++;
        scoreDisplay.textContent = score;
        moveTarget(); // Mutăm imediat căsuța când e prinsă
    }
});

// Când apeși butonul de start
startBtn.addEventListener('click', startGame);